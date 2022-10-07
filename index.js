const express = require('express')

const app = express()
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//this tells the index/root that all routes will be handled by index.js files in routes folder
// ./routes and ./routes/index.js are the same thing
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})