const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
const app = express()
const port = 8000;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

// for getting static files like images, js files and css files
//we tell the app to look for images, css and script js files in assests folder inside root
app.use(express.static('./assets'))
//it tells the app to use expressLayouts for configuring layouts as a wrapper for views, this must be placed above where the views are set
app.use(expressLayouts);

//extract the styles/css and scripts/js from sub-pages in the main layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

//setting ejs and views
//this will set ejs as the view engine
app.set('view engine', 'ejs');
// this will set views to look for views in the views folder
app.set('views', './views');
//views must be set before routes, so that views are loaded before rendering the routes

//here we set up express-sessions to set up session
app.use(session({
  name: 'friendbook',
  //todo change the secret in production
  secret: 'blahsomething',
  saveUninitialized: false,
  resave:false,
  cookie: {
      maxAge: (1000*60*100)
      //this is the maxage in milliseconds
  },
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/FriendBook-Development' })

}))
//here we initialize passport and passport session as soon as the app loads
app.use(passport.initialize());
app.use(passport.session());
//here as soon as the passport is initialized and the session is created for logged in user,
//we save the user in locals variable to display it in views
app.use(passport.setAuthenticatedUser);
//this will set the logged-in user in locals.user for the views as soon as the app loads.

//this tells the index/root that all routes will be handled by index.js files in routes folder
// ./routes and ./routes/index.js are the same thing
//this tells the app to fetch all the routes from index file in routes folder
//this acts as a middleware for routes
app.use('/', require('./routes'));

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})