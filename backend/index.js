require('dotenv').config();
const express = require('express');
const app = express();
require('./Models/db');

// require('dotenv').config();

const PORT =  process.env.PORT || 8000;

app.get('/ping', (req,res)=>{
    res.send('pong');
})

app.listen(PORT ,()=>{
    console.log(`server is runing on port 8000`)
})









