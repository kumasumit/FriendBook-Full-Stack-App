const express = require('express')
const router = express.Router()
const passport = require('passport');
//include the users_controller
const usersController = require('../controllers/users_conroller');
router.get('/profile', usersController.profile);
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

module.exports = router