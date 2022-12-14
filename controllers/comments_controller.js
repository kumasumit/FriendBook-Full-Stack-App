const Comment = require("../models/comments");
const Post = require("../models/posts");
const commentsMailer = require("../mailers/comments_mailer");
//Action 1 to create a comment
module.exports.create = async function (req, res) {
  try {
    //here req.body.post contains the postId
    //find a post by postId
    let post = await Post.findById(req.body.post);
    if (post) {
      //if post is found only then create a comment for that post
      let comment = await Comment.create({
        content: req.body.content,
        // req.boy.post is the hidden variable that contains the post._id for which the comment was posted
        post: req.body.post,
        // here post conatins the post.id of the post on which comment is created
        user: req.user._id,
        //in user we store the id of the signed-in/logged-in user
      });
      //after the comment is created push that comment in form of id to comments array inside Post
      post.comments.push(comment);
      post.save();
      //save the updated post
      //we populate the name and email of the user using user stored in comments
      comment = await comment.populate('user', 'name email').execPopulate();
      //here we pass the populated comment with name and email to commentsMailer.newComment function from the mailers/comment_mailer.js file
      // commentsMailer.newComment(comment);
      req.flash('success', 'Comment published!');
      return res.redirect("back");
      //redirect to home
    }
  } catch (err) {
    //if there is any error in above process, the control will go to catch block
    // and we will log the errors in the console and return
    req.flash('error', err);
    return;
  }
};

//Action 2 to delete a comment, if a signed-in user owns the comment
//delete comments
module.exports.destroy = async function (req, res) {
  try {
    //find a comment by id
    let comment = await Comment.findById(req.params.id);
    //here we are going inside comment models and finding the comment
    //which the user clicked to delete
    if (comment.user == req.user.id) {
      //if the user who posted that comment is same as the user trying to delete the comment
      let postId = comment.post;
      //here we save the postId, so that we can use this postId to delete comment ids from the post.comments array
      // comment.post holds the post._id of the post on which the comment is posted
      comment.remove();
      //remove/delete the comment
      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      //go in Posts Schema search the post by id, inside comments array of that post, pull a specific comment by id passed by user and delete it
      //this will delete the comment_id from the comments array of that particular post
      //here we update the Post model, we go in model. find a post by Id, pull a specific comment, whose id matches the id of the deleted comment, and  we delete a specific comment from the comments array
      //
      //go in Posts Schema search the post by id, inside comments array of that post, pull a specific comment by id passed by user and delete it
      //this will delete the comment_id from the comments array of that particular post
      req.flash('success', 'Comment deleted!');
    } else {
      //if the user trying to delete the comment is different from user who posted that comment
      //send the control back to the user
      req.flash('error', 'Unauthorized');
      return res.redirect("back");
    }
  } catch (err) {
    //if there is any error in above process, the control will go to catch block
    // and we will log the errors in the console and return
    req.flash('error', err);
    return;
  }
};
