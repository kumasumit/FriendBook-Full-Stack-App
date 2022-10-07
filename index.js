const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000;



app.use(express.urlencoded());
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

//this tells the index/root that all routes will be handled by index.js files in routes folder
// ./routes and ./routes/index.js are the same thing
//this tells the app to fetch all the routes from index file in routes folder
//this acts as a middleware for routes
app.use('/', require('./routes'));

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})