// initializing express
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const UserRouter = require('./Routes/UserRouter')
const AuthRouter = require('./Routes/AuthRouter')

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

app.use('/api/user',UserRouter)
app.use('/api/auth',AuthRouter)

