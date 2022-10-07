const express = require('express')
const router = express.Router()
//include the users_controller
const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);
//router to render sign-in and sign-up pages
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//router to destroy-session logout a signed-in user
router.get('/logout', usersController.logout);
//router to post sign-up form data or create a new user
router.post('/create', usersController.create);
//router to post sign-in form data or create a cookie-session for signed-in user
router.post('/create-session', usersController.createSession);


module.exports = router