const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
        //this means the field cannot be empty
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // here we are using user.id to referece the user schema
    }
},{
    timestamps: true
    // we have used timestamps to store createdAt and updatedAt
});

const Post = mongoose.model('Post', postSchema);
//here we link Post model with postSchema
module.exports = Post;