const express = require('express')

const app = express()
const port = 8000;
//this will set ejs as the view engine
app.set('view engine', 'ejs');
// this will set views to look for views in the views folder
app.set('views', './views');

//this tells the index/root that all routes will be handled by index.js files in routes folder
// ./routes and ./routes/index.js are the same thing
//this tells the app to fetch all the routes from index file in routes folder
//this acts as a middleware for routes
app.use('/', require('./routes'));

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})