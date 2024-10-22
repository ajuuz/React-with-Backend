const User = require('../Models/Schema.js')
const bcryptjs = require('bcryptjs');

exports.signup=async (req,res)=>{ 
    const {name,email,phone,username,password} = req.body;
    console.log(name,email,phone,username,password);
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({name,email,phone,username,password:hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}




