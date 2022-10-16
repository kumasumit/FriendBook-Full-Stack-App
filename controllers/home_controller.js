const Post = require("../models/posts");
const User = require("../models/users");

//Action 1 for home '/'
module.exports.home = async function (req, res) {
  try {
    // Step 1: get posts
    //any success response of Post.find will be stored in posts
    let posts = await 
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

  // Step 2: get users
  //any success response of User.find will be stored in users 
  let users = await User.find({});
  //User.find({}) will display all the users in the database
  // Step 3: return posts and users to the home view page, home.ejs page
  return res.render('home', {
      title: " FriendBook || Home",
      posts: posts,
      all_users: users
  });
  }catch(error){
    console.log("Error", error);
    return;
  }
}  