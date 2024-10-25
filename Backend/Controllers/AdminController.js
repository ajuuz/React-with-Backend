const {Admin,User} = require('../Models/Schema');
const jwt=require('jsonwebtoken')
const {errorHandler} = require('../utils/error');
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