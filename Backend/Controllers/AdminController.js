const {Admin,User} = require('../Models/Schema');
const jwt=require('jsonwebtoken')
const {errorHandler} = require('../utils/error');
const bcryptjs = require('bcryptjs')
exports.signin=async(req,res,next)=>{
    const {email,password} = req.body;
    try{
    const ValidAdmin = await Admin.findOne({email:email});
    if(!ValidAdmin) return next(errorHandler(404,"Admin not found"))
    if(ValidAdmin.password===password){
        const token = jwt.sign({id:ValidAdmin._id},process.env.JWT_SECRET);
        res.cookie('adminAccess_token',token,{httpOnly:true,maxAge: 3600000})
        .status(200)
        .json({id:ValidAdmin._id})
    }
    else
    {
        next(errorHandler(401,"wrong credential"));
    }
    }
    catch(error){

    }
}

exports.logout=(req,res)=>{
    res.clearCookie('adminAccess_token');
    res.status(200).json({message:"admin logout succesffuly"})
}

exports.getallUsers=async(req,res)=>{
    try{
        const allUsers = await User.find({})
        res.status(200).json({users:allUsers})
    }
    catch(error){
        console.log("error fetching the all users data")
    }
}


exports.getuser =async (req,res)=>{
    
    const id = req.params.id;
    try{ 
        if(!id) return res.status(400).json({message:'No user found'});
        const user = await User.findOne({_id:id});
        res.status(200).json(user)
    }
    catch(error){
        console.log("error in getting user in profile page"+error)
    }
}

exports.edituser=async(req,res,next)=>{
    const id=req.params.id;
    const {name,email,username,phone} = req.body;
    try{
        const updateUser = await User.updateOne({_id:id},{$set:{name,email,username,phone}})
        console.log(updateUser);
        res.status(200).json({message:"updated by admin successfully"})
    }
    catch(error){
        if(error.code===11000)
        {
            const duplicatedField = Object.keys(error.keyValue)[0];
            return next(errorHandler(409,`${duplicatedField} already exists`))
        }
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

exports.deleteuser =async (req,res)=>{
    const token = req.cookies.access_token;
    
    const id=req.params.id;
    try{
        await User.deleteOne({_id:id})
        if(token)
        {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode.id)
            if(decode.id===id)
            {
                res.clearCookie('access_token')
            }
        }
        res.status(200).json({message:"user has been deleted successfully"})
    }
    catch(error){
        console.log("error during deleting user by admin")
    }
}

exports.adduser=async(req,res,next)=>{
    const {name,email,username,phone,password,imagePath} = req.body;
    // hashing the password
    const hashedPassword = bcryptjs.hashSync(password,10);
    // saving new user
    const newUser = new User({ name, email, username, phone, password: hashedPassword, imagePath })
    try{
        await newUser.save();
        res.status(200).json({message:"user added successfully"})
    }
    catch(error){
        if(error.code===11000)
            {
                const duplicatedField = Object.keys(error.keyValue)[0];
                return next(errorHandler(409,`${duplicatedField} already exists`))
            }
            next(err)
    }
}