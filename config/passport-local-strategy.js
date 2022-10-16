//require the passport instance
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
// Authentication using Passport
passport.use(new LocalStrategy(
    {
    usernameField:'email',
    //here we set email from schema to be our username value
    passReqToCallback: true,
    },
    function(req, email, password, done) {
      User.findOne({ email: email }
        //here we match the email entered by user with the email value in the database
        ,function (err, user) {
        if (err)
        {
            req.flash('error', err);
            return done(err);
        }
        if (!user || user.password !== password)
        {
            //if no user is found for the corresponding email
            //or the password entered by user doesn't match the password in the mongoose Schema
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
            //null stands for the error and false stands for no user found
        }
        //if user is found for the particular email and passwords match, then
        return done(null, user);
        // here user is the user found and authenticated
      });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //here done is just a callback function,
    //you can call it anything else
    done(null, user.id)
    //we set the req.cookies.user.id as user.id of the logged-in/signed-in user
})

//deserializing the user from the key in the cookies
//here we get the id stored in cookies to find the User
passport.deserializeUser(function(id, done)
{
  User.findById(id, function(err, user){
    if(err){
        console.log('Error in finding user ---> Passport');
        return done(err);
    }
    //here done is a just a callback function provided by passport
    return done(null, user);
  })
})

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if user is signed in, then pass on the request to the next function
    if(req.isAuthenticated()){
      return next();
    }
    //if user is not signed-in, redirect the req to sign-in route
    return res.redirect('/users/sign-in');
  }

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
      //req.user containes the current signed in user from the session cookie and we are just sending this to the locals for the views
      res.locals.user = req.user;
      //here user is the complete logged-in user
    }
    next();
  }
//at last export the passport module
module.exports = passport;