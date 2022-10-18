const passport = require('passport');
let User = require('../models/users');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//here we are using OAuth2 for google passport as it is the latest one
const crypto = require('crypto');
// crypto is an inbuilt module in node

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "312077876785-4evhjmqtsn0nsb2rihkh3brsbcsdhlkn.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    
    //this is the callback function
     function (accessToken, refreshToken, profile, done) {
        // accessToken is used by google to verify the user just like jwt token
        //refresh token is used by google to generate a new token when the old token expires
        //here done is the callback after this callback function executes
        //find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
                if (err) {
                    console.log("Error in Google strategy-passport", err);
                    return;
                }
                console.log(profile);
                console.log(accessToken, refreshToken);
                //if the user is found, set the user as req.user
                if (user) {
                    return done(null, user);
                } else {
                    //if user is not found in our database we create that user in our database
                    User.create({
                        //create the new user and set it as req.user
                        //what we mean by set the user as req.user is simply sign in the user
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    }, function (err, user) {
                        //this is the callback function after User.create
                        if (err) {
                            console.log("Error in creating User Google strategy-passport", err);
                            return;
                        }
                        return done(null, user);
                        // done is just the name of callback function
                    })
                }
            })
    }
));

module.exports = passport;