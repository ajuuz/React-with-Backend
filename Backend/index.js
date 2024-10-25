const dotenv = require('dotenv');
dotenv.config()
// initializing express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const UserRouter = require('./Routes/UserRouter')
const path = require('path')

// configuring PORT
const PORT =  process.env.PORT|| 3000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

// connecting mongodb


mongoose.connect('mongodb://127.0.0.1:27017/mern-auth')
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.error(err))


// to parse the data coming from URL
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/user',UserRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})