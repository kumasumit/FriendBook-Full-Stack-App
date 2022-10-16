const Post = require('../models/posts');
const Comment = require('../models/comments');

//Action 1 to create a Post by a signed-in user
module.exports.create = async function (req, res) {
    try{
        //create the post with content and userId of the user who created that post
        await Post.create({
            content: req.body.content,
            user: req.user._id
            //here we dont store the complete user but only the id, since id is unique for every user, and can be used to populate the entire user at a later stage
            //here in id we are storing the id of the user who is creating the post
        })
        //after creating the post we return the control back to home
        return res.redirect('back');
    }catch(error){
        //if there is any error in above process, the control will go to catch block
        // and we will log the errors in the console and return
        console.log("Error", error);
        return;
    }
    Post.create({
        content: req.body.content,
        user: req.user._id
     //here we dont store the complete user but only the id, since id is unique for every user, and can be used to populate the entire user at a later stage
     //here in id we are storing the id of the user who is creating the post
    }, function (err, post) {
        if (err) {
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    })
}

//Action 2 to delete a Post by a signed-in user
//delete a post and all associated comments
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // .id means converting the object id into string
        //here we check if user requesting to delete the post is the same user who created/owns the post
        if (post.user == req.user.id){
            //if the ids match, both users are same, then delete the post
            post.remove();
            //post.remove() will delete the post
            //go inside Comment schema and search all the comments belonging to a particular post and delete all the linked comments with the deleted post
            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
            //Comment.deleteMany() will delete more than one comment
        }
        //if users dont match, send the control back
        else{
            return res.redirect('back');
        }
    });
}