//Action 1 for home '/'
module.exports.home = function(req, res){
    return res.render('home', {title: "Home"});
    //here home is the home.ejs files in views, title is the context with value Home passed to home.ejs file
}