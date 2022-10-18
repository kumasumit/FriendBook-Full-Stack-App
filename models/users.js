const mongoose = require('mongoose');
const multer  = require('multer');
const path = require("path");
const AVATAR_PATH = path.join('/uploads/users/avatars');
//'/upload/users/avatars' is the path where we store our avaatars locally
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        //this means that this field is required, this field cannot be empty
        unique: true,
        // this means that email will be unique for every user
    },
    password: {
        type: String,
        required: true
    }, name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,  
    },
    // avatar will store the link to where the avatar image is stored in form of a link, avatar will store the address to where the image is stored and not the actual image
},{
    timestamps: true
//   timestamps store the value createdAt and updatedAt
})

//multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..', AVATAR_PATH ));
    },
    // here destination is the exact link where our files will be stored
    filename: function (req, file, cb) {

      cb(null, file.fieldname + '-' + Date.now());
    //we added the date with each file so that each file with even the same names Sumit.png are unique because of the date
    }
  })
//multer storage closes

//making static functions
userSchema.statics.uploadAvatar = multer({storage: storage}).single('avatar');
//we assign the storage variable to storage inside multer for multer to be able to use it.
// .single('avatar') tells multer only one file must be added for fieldname avatar 
userSchema.statics.avatarPath = AVATAR_PATH;
//how to access static values
// User.uploadAvatar , User.avatarPath 
const User = mongoose.model('User', userSchema);
//here User is a model connected to userSchema
module.exports = User;