const {Admin} = require('../Models/Schema');
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