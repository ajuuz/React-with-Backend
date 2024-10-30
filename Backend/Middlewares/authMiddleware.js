const jwt = require('jsonwebtoken');

const {User,Admin} = require('../Models/Schema');

exports.verifyUser = async (req,res,next)=>{
    const token = req.cookies.access_token
    
    if(token)
    {
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            const validUser = await User.findById(decode.id).select('-password')
            console.log(validUser)
            if(!validUser) return res.status(401).json({message:"unauthorized User"})
            next();
        }
        catch(error)
        {
            res.status(500).json({message:"something happended during getting user"})
        }
    }
    else{
        res.status(401).json({message:"You are not signed. Unauthorized"})
    }
}

exports.verifyAdmin=async(req,res,next)=>{
    console.log("middleware auth")
    const token = req.cookies.adminAccess_token;
    if(token){
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            const user = await Admin.findById(decode.id).select('-password')
            console.log(user)
            if(!user) return res.status(401).json({message:"unauthorized user"})
            next();
        }
        catch(error){
            console.log("here comes")
            res.status(500).json(error.message);
        }
    }
    else
    {
        res.status(401).json({message:"You are not signed in . Unauthorized"})
    }
}