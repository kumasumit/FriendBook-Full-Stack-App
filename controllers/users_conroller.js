const User = require('../models/users');


//Action 1 for /users/profile
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    })
}

//Action 2 to render sign-up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title:"FriendBook||Sign Up"
    });
}

//Action 3 to render sign-in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "FriendBook||Sign In"
    });
}