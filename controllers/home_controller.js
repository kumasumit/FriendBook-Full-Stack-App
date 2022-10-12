const Post = require('../models/posts');
//Action 1 for home '/'
module.exports.home = function(req, res){
    Post.find({}).populate('user', 'name email').exec(function(err, posts)
    //find({}) finds all the posts with specific filter
    {
        //here user is populated with name,email and we dont include password for safety
        if (err) return handleError(err);
        return res.render('home', {
            //here 'home' is the home.ejs file
            title:"Home",
            posts: posts
            //here posts.user contains complete details of user,
            //after populating the user with id stored in postsSchema
            //it includes only name, email and not password
        });
    })
}