require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
require('./Models/db');

// require('dotenv').config();

const PORT =  process.env.PORT || 8000;

app.get('/ping', (req,res)=>{
    res.send('pong');
})

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT ,()=>{
    console.log(`server is runing on port 8000`)
})









