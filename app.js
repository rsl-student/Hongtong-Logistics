const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();

//middleware
app.use(express.json());

//Import route s
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

//Routes
app.get('/', (req, res) => {
    res.send("Getting values");
})

//connect to db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.log('Connected to database'));

//listen
app.listen(3000, ()=> {
    console.log("Starting app");
});


