const User = require("../models/users");
const fs = require('fs');
const path = require('path');

//Action 1 for /users/profile
module.exports.profile = function (req, res) {
  //here we find the user from the database by id
  User.findById(req.params.id, function (err, user) {
    //here params.id is the id of the user on which you clicked
    res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
      //here user is user found from the database by req.params.id from the users collection in the MongoDBdatabase
      //here user found from the database is assigned to variable profile_user
    });
  });
};

//Action 2 to render sign-up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    //  if user is alreday signed in , send the user to the profile page
    return res.redirect("/users/profile");
  }
  //if user is not signed-up, send the control to sign-up page form
  return res.render("user_sign_up", {
    title: "FriendBook | Sign Up",
  });
};

//Action 3 to render sign-in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    //if user is logged in, redirect it to the profile page
    return res.redirect("/users/profile");
  }
  //if user is not signed-in, send the control to sign-in page form
  return res.render("user_sign_in", {
    title: "FriendBook | Sign In",
  });
};

//Action 4 for /users/create to  create a new user
//this action handles sign_up form submission data
module.exports.create = function (req, res) {
  // first check whether password and confirm password are equal or notEqual, if they are not equal send the user back to the sign up page
  if (req.body.password !== req.body.confirm_password) {
    req.flash('error', 'Passwords do not match');
    return res.redirect("back");
  }
  //if password and confirm_password are same, search the user corresponding to the email provided in the form/body
  User.findOne({ email: req.body.email }, function (err, user) {
    if(err){req.flash('error', err); return}
    if (!user) {
      //if no user is found for the corresponding email
      //means no previous user is associated with that email, create and store the new user
      User.create(req.body, function (err, user) {
        if(err){req.flash('error', err); return}
        //after creating the user redirect the user to sign in page for the new user to sign in
        return res.redirect("sign-in");
        //whenever you are inside callback use only the single route like home, sign-in, sign-up and not /users/sign-up or /users/sign-in
      });
    } else {
      // if the user is already present send the control back to sign in page
      req.flash('success', 'You have signed up, login to continue!');
      return res.redirect("sign-in");
      //whenever you are inside callback use only the single route like home, sign-in, sign-up and not /users/sign-up or /users/sign-in
    }
  });
};

//Action 5 for /users/create-session to  create a new session for logged in user
//this action handles sign_in form submission data
module.exports.createSession = function (req, res) {
  //here session creation is handled by passport-local-strategy
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

//Action 6 for /users/sign-out to destroy session for logged in user on clicking sign out button
//controller for logout for signout
module.exports.destroySession = function (req, res, next) {
  //req.logout is a function given by passport
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out successfully");
    //after session is destroyed, redirect to home page
    return res.redirect("/");
  });
};


//Action 7 to update profile
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    //check if the user clicked is the same user logged-in/signed-in
    try{
      let user = await User.findById(req.params.id);
      //find the clicked user by id
      //call the static function uploadAvatar on the clicked User
      User.uploadAvatar(req, res, function (err) {
          if (err) {
              console.log('***** Multer Error', err)
          }
          user.name = req.body.name;
          //this is the new name from the form body
          user.email = req.body.email;
          //this is the new email from the form body
          user.password = req.body.password;
          //this is the new password from the form body
          if (req.file) {
            //if the request object hs a file
              if (user.avatar) {
                //if avatar alreay exits for a specific user, remove the old avatar
                //and unlink the file path with actual file
                  fs.unlinkSync(path.join(__dirname, '..', user.avatar));
              }
              user.avatar = User.avatarPath + '/' + req.file.filename;
              //save the new path linked to new file in user.avatar
          }
          //finally save the modified/updated user
          user.save();
          // console.log(user);
          //after user is saved show the User Updated message
          req.flash('success', 'User Details Updated!');
          //since the update is successful redirect to home page
          return res.redirect('back');
      })
  } catch (err) {
      console.log("Error: ", err);
      return;
  }
  } else {
    //if logged-in user is trying to update someone's else profile, then send Unauthorized request
    return res.status(401).send("Unauthorized");
  }
};