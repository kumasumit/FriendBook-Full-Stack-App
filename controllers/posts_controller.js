const Post = require('../models/posts');
const Comment = require('../models/comments');

//Action 1 to create a Post by a signed-in user
module.exports.create = async function (req, res) {
    try{
        //create the post with content and userId of the user who created that post
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
            //here we dont store the complete user but only the id, since id is unique for every user, and can be used to populate the entire user at a later stage
            //here in id we are storing the id of the user who is creating the post
        })
            //check to see if the incoming request is an xhr/ajax request
            //all ajax requests are XMLHttpRequest objects and req type for ajax is xhr
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post: post,
                        //here post has content, comments array and only the userId, not the complete populated user
                    },
                    message: "Post created"
                })
            }
        //after creating the post we return the control back to home
        req.flash('success', 'Post published!');
        return res.redirect('back');
    }catch(error){
        //if there is any error in above process, the control will go to catch block
        // and we will log the errors in the console and return
        req.flash('error', err);
        return res.redirect('back');
    }    
}

//Action 2 to delete a Post by a signed-in user
//delete a post and all associated comments
module.exports.destroy = async function(req, res)
{   
    try{
    //find the post by id which needs to be deleted
    let post = await Post.findById(req.params.id);
    //here post contains the complete Post and ot just the id of the post
    // .id means converting the object id into string
    //here we check if user requesting to delete the post is the same user who created/owns the post
    if (post.user == req.user.id)
    {
        //if the ids match, both users are same, then delete the post
        post.remove();
        //post.remove() will delete the post
        //go inside Comment schema and search all the comments belonging to a particular post and delete all the linked comments with the deleted post
        await Comment.deleteMany({post: req.params.id});        
        //Comment.deleteMany() will delete more than one comment
        //after deleting posts and comments return the control back to requesting page
        req.flash('success', 'Post and associated comments deleted!');
        return res.redirect('back');
        }
        //if users dont match, send the control back
        else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }catch (err) {
        //if there is any error in above process, the control will go to catch block
        // and we will log the errors in the console and return
        req.flash('error', err);
        return res.redirect('back');
    }
}