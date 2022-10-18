const express = require('express')
const router = express.Router()
const passport = require('passport');
//include the users_controller
const usersController = require('../controllers/users_conroller');
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
// only give a user to update if the user is logged-in
//router to render sign-in and sign-up pages
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
//router to post sign-up form data or create a new user
router.post('/create', usersController.create);
//use passport as a middleware to authenticate
//router to post sign-in form data or create a new session of signed-in user
router.post('/create-session', passport.authenticate(
    'local',
    //here local stands for passport-local strategy
    //if the authentication fails redirect the control to sign-in page
    {failureRedirect:'/users/sign-in'},
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);

//here we define 2 routes to sign in by google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
//here passport authenticates using google as a strategy and set profile and email as scope as we want both the fields
//this is the google callback route
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), usersController.createSession);
//here we set the callback route, after authentication using google as a stategy in case google sign-in fails we redirect to sign-in page and after successful sign-in by google we redirect to createSession Action
module.exports = router