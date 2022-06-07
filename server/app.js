const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route= require('./sever/routes/router')
const app = express();


// cors setup
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
};

app.use(cors(corsOpts))
//DB config 
const db = require('./sever/config/keys.js').MongoURI;

//connect DB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then (()=> console.log('Connected to Mongo'))
  .catch(err => console.log(err));


//body pasam
app.use(express.json());



//Routes
app.use(route,function(req,res,next){
    next();
})

const POST = process.env.PORT || 3000
app.listen(POST, console.log('Sever started on port 3000'));

