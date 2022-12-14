//require mongoose
const mongoose = require('mongoose');
//design a mongoose Comment Schema
const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //here content is the content of the comment user creates

    user: {
        //link the comment to the user who created the comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    post: {
        //link the comment to the post on which the comment was posted
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
    // we have used timestamps to store createdAt and updatedAt
})
//here we link the comment model to commentSchema
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;