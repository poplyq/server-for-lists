const express = require('express');
const cors  =  require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMidleware = require('./middlewares/error-midleware')

const PORT = process.env.PORT | 4010;
const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMidleware);


const start = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
app.listen(PORT, ()=>{
    console.log(`Server starts at ${PORT}`);
})

    }
    catch(e){
        console.log(e);
    }
}

start()