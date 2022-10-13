const express = require('express')
const router = express.Router()
const passport = require('passport');
//require the posts_controller
const postsController = require('../controllers/posts_controller');
//passport.checkAuthentication will prevent the user from creating a post if the user is not signed in
router.post('/create',passport.checkAuthentication ,postsController.create);
//a router to delete a specfic post, only if the user is signed in
router.get('/destroy/:id', passport.checkAuthentication,postsController.destroy);
//here passport.checkAuthentication checks whether the user is signed-in or not




module.exports = router;