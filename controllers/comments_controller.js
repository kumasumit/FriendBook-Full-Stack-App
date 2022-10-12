const Comment = require('../models/comments');
const Post = require('../models/posts');

//Action 1 to create a comment
module.exports.create = function(req, res){
    //find a post by id
    Post.findById(req.body.post, function(err, post){

        if (post){
            //if post is found only then create a comment for that post
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                // here post conatins the post.id of the post on which comment is created
                user: req.user._id
                //in user we store the id of the signed-in/logged-in user
            }, function(err, comment){
                // handle error
                //after the comment is created push that comment in form of id to comments array inside Post
                post.comments.push(comment);
                post.save();
                //save the updated post
                res.redirect('/');
                //redirect to home
            });
        }
    });
}