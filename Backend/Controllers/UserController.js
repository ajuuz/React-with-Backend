const dotenv = require('dotenv');
dotenv.config()

const {User,Admin} = require('../Models/Schema.js')
const bcryptjs = require('bcryptjs');
const {errorHandler} = require('../utils/error.js');
const jwt = require('jsonwebtoken');
const path=require('node:path')

exports.signup=async (req,res,next)=>{ 
    const {name,email,phone,username,password,imagePath} = req.body;
   console.log(email)
    // hashing the password
    const hashedPassword = bcryptjs.hashSync(password,10);
    // saving the User
    const newUser = new User({name,email,phone,username,password:hashedPassword,imagePath});
    try{
        await newUser.save();
        res.status(201).json({message:`${name}'s account created successfully`})
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
        const {password:hashedPassword,phone,imagePath,createdAt,updatedAt,...rest} = validUser._doc;
        
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


exports.ImageUploads = (req,res)=>{
    try{
        console.log("user req file is this "+req.file)
        if(!req.file)
        {
            return res.status(400).json({message:'No file uploaded'});
        }
        
        res.status(200).json({
            message: 'Image uploaded successfully',
            filePath:  path.basename(req.file.path)  // Return file path to client
        });
    }
    catch(error){
        res.status(500).json({message:'Image upload failed',error:error.message})
    }
}


exports.getuser =async (req,res)=>{
    
    const id = req.params.id;
    try{
       
        if(!id) return res.status(400).json({message:'No user found'});
        const currentUser = await User.findOne({_id:id});
        res.status(200).json(currentUser)
    }
    catch(error){
        console.log("error in getting user in profile page"+error)
    }
}


exports.edituser =async (req,res)=>{
    const id = req.params.id;
    const key=req.params.key;
    const value= req.body.edittedFieldData;
    try{
      const updatedUser=await User.updateOne({_id:id},{$set:{[key]:value}});
      res.status(200).json({message:`${key} updated successfully`})
    }
    catch(error){
        if(error.code===11000)
        {
            res.status(400).json({message:`${value} is already in use`})
        }
    }
}

exports.passwordcheck =async (req,res,next)=>{
 
    const {currentPwd,newPwd} = req.body;
    const id= req.params.id
    try{
        const user = await User.findOne({_id:id})
        const validPassword = bcryptjs.compareSync(currentPwd,user.password);
        if(!validPassword) return next(errorHandler(401,"enter your current password"))
        const hashedPassword = bcryptjs.hashSync(newPwd,10);
        await User.updateOne({_id:id},{$set:{password:hashedPassword}})
        res.status(200).json({message:"password updated successfully"})
    }
    catch(error){
        console.log("error in password change"+error.message);
        res.status(500).json({message:error.message})
    }
}


exports.editimage =async (req,res)=>{
    const id= req.params.id;
    const imagePath = req.body.imagePath;
    try{
        const updateImage = await User.updateOne({_id:id},{$set:{imagePath:imagePath}})
        console.log(updateImage)
        res.status(200).json({message:"image updated successfully"})
    }
    catch(error){
        console.log("error catched in image edit")
    }
}

exports.logout=(req,res)=>{
    res.clearCookie('access_token')
    res.status(200).json({message:"logout successfull"})
}