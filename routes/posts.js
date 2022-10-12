const express = require('express')
const router = express.Router()
const passport = require('passport');
//require the posts_controller
const postsController = require('../controllers/posts_controller');
router.post('/create', postsController.create);




module.exports = router;