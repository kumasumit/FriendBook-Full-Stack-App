const express = require('express')
const router = express.Router()
const passport = require('passport');
//require the posts_controller
const postsController = require('../controllers/posts_controller');
//passport.checkAuthentication will prevent the user from creating a post if the user is not signed in
router.post('/create',passport.checkAuthentication ,postsController.create);




module.exports = router;