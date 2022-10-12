const Post = require('../models/posts');
//Action 1 for home '/'
module.exports.home = function(req, res){
      // loads posts and comments both
      Post.find({})
      //find all the posts from the database
      .populate('user', 'name email')
      //populate user for each post with only name and email, not password
      .populate({
          path: 'comments',
          //populate comments array for each post
          populate: {
              //populate user inside comment for each comment inside comments array
              path: 'user'
          }
      })
      .exec(function(err, posts) {
          if(err) {
              return handleError(err);
          }
          return res.render('home', {
              title: "Home",
              posts: posts,
              //here posts is the populated posts with comments and user populated
          })
      })
}