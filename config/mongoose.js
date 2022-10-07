const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FriendBook-Production0');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to Mongo DB"));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB')
})
module.exports = db;