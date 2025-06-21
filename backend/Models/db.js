
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
if (!mongo_url) {
    throw new Error('MongoDB connection string is missing in environment variables');
}

mongoose.connect(mongo_url)
    .then(()=>{
        console.log('MongoDB connected successfully');
    }).catch((err)=> {
        console.log('MongoDB connection failed:', err);
    })














