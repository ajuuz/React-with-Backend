const dotenv = require('dotenv');
dotenv.config()

const User = require('../Models/Schema.js')
const bcryptjs = require('bcryptjs');
const {errorHandler} = require('../utils/error.js');
const jwt = require('jsonwebtoken');


exports.signup=async (req,res,next)=>{ 
    const {name,email,phone,username,password} = req.body;
    console.log(name,email,phone,username,password);
    // hashing the password
    const hashedPassword = bcryptjs.hashSync(password,10);
    // saving the User
    const newUser = new User({name,email,phone,username,password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"User created successfully"})
    }
    // catch error if email,username should be unique
    catch(err){
        if(err.code===11000)
        {
            const duplicatedField = Object.keys(err.keyValue)[0];
            return next(errorHandler(409,`${duplicatedField} already exists`))
        }
        next(err)
    }
}


exports.singin = async (req,res,next)=>{
    const {email,password} = req.body;
    console.log(email,password);
    try{
        // user fetch from the db
        const validUser = await User.findOne({email:email});
        // if no User return error
        if(!validUser) return next(errorHandler(404,'User not found'));
        // comparing password
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        // if password wrong
        if(!validPassword) return next(errorHandler(401,'wrong credentials'))
        
        // token creation
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:hashedPassword,...rest} = validUser._doc;
        
        // setting token in the cookie
        res
        .cookie('access_token',token,{httpOnly:true,maxAge: 3600000})
        .status(200)
        .json(rest)
    }
    catch(err){
        next(err);
    }
}



