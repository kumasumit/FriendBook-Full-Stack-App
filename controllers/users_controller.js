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

//Action 4 for /users/create to  create a new user
//this action handles sign_up form submission data
module.exports.create = function(req, res){
    // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }
    //if password and confirm_password are same, search the user corresponding to the email provided in the form/body
    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log('error in signing up');
            return;
        }
        if(!user){
            //if no user is found for the corresponding email
            //means no previous user is associated with that email, create and store the new user
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                //after creating the user redirect the user to sign in page for the new user to sign in
                return res.redirect('sign-in');
                //whenever you are inside callback use only the single route like home, sign-in, sign-up and not /users/sign-up or /users/sign-in
            })
        }else{
            // if the user is already present send the control back to sign in page
            return res.redirect('sign-in');
            //whenever you are inside callback use only the single route like home, sign-in, sign-up and not /users/sign-up or /users/sign-in
        }
    })
}

//Action 5 for /users/create-session to sign-in a created user
//this action handles sign_in form submission data
module.exports.createSession = function(req, res){
    //find the user by the email
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }
        //handle user found
        if(user){
            //handle password which dont match with saved user password
            if(user.password !== req.body.password){
                //return the control back to the sign in page
                return res.redirect('back');
            }
            // handle session-creation if user is found and the password entered is same as password of the user in the database
            res.cookie('user_id', user._id);
            // now redirect the user to the profile page
            return res.redirect('/users/profile');
        }
        // handle user not found redirect it to the sign-in page
        else{
            return res.redirect('back');
        }
    })
}

//Action 6 for /users/profile to display profile of a signed in user
//this action displays profile details of signed in user
module.exports.profile = function (req, res) {
    //first check if cookies present in req contains user_id
    if (req.cookies.user_id) {
        //find the user by Id
        User.findById(req.cookies.user_id, function (err, user) {
            //here user contains complete user not just the id
            if (user) {
                //if the user is found send the user to the profile page
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
                //here in context we are passing title and the complete user stored in the req.cookies
            } else {
                //if no user is found by id in req.cookies send the control back to the sign-in page
                return res.redirect('sign-in');
                //here we are inside callback so use only sign-in not /users/sign-in
            }
        })
    } else {
        //if there are no cookies stored in the req.cookies send the control back to the sign in page
        return res.redirect('/users/sign-in');
    }
}