const Post = require("../models/posts");
const User = require("../models/users");
//Action 1 for home '/'
module.exports.home = function (req, res) {
  // loads posts and comments both
  Post.find({})
    //find all the posts from the database
    .populate("user", "name email")
    //populate user for each post with only name and email, not password
    .populate({
      path: "comments",
      //populate comments array for each post
      populate: {
        //populate user inside comment for each comment inside comments array
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        return handleError(err);
      }
      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Home",
          posts: posts,
          //here posts is the populated posts with comments and user populated
          all_users: users,
          //here we find all the users and assign it to all_user variable in home action of home_controllers
        });
      });
    });
};
