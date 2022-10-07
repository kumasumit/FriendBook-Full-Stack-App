const express = require('express')
const router = express.Router()
//include the users_controller
const usersController = require('../controllers/users_conroller');
router.get('/profile', usersController.profile);


module.exports = router