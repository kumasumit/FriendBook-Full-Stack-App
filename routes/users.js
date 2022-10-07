const express = require('express')
const router = express.Router()
//include the users_controller
const usersController = require('../controllers/users_conroller');
router.get('/profile', usersController.profile);
//router to render sign-in and sign-up pages
router.get('/sign-in', usersController.signIn);
router.get('sign-up', usersController.signUp);


module.exports = router