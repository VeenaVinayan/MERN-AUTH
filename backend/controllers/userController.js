//route POST /spi/users/auth
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password } = req.body;
    console.log(name);
    
    const userExists = await User.findOne({email})
    console.log(userExists);
    
    if(userExists){
        res.status(400);
        throw new Error('User already Exists... !!');
    }
    const salt = await bcrypt.genSalt(10);
    const pwd = await  bcrypt.hash(password,salt);
        
    const user = await User.create({
         name,
         email,
         password:pwd,
    });
    console.log("user",user);
    
    if(user){
             generateToken(res,user._id);
             res.status(201).json({
             _id:user._id,
             name:user.name,
             email:user.email,
         });
    }else{
        res.status(400);
        throw new Error('Invalid User Data !');
    }
});
//Get user Profile
// GET /api/user/profile
const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    });
    res.status(200).json({message:'LoggedOut User !!'});
});
//Get user Profile
// GET /api/user/profile
// access private
const getUserProfile = asyncHandler(async(req,res) => {
    console.log('Inside get user Profile !');
    const user ={
         _id:req.user._id,
         name:req.user.name,
         email:req.user.email,
    }
    res.status(200).json(user);
});
//Get user Profile
//api/user/profileUpdata

const updateUserProfile = asyncHandler(async(req,res) => {
    console.log('Inside get user Profile--Update !');
    console.log(req.body);
    const user = await User.findById(req.user._id);
   
    if(user){
         user.name = req.body.name ;
         user.email = req.body.email ;
      const updatedUser = await user.save();
      console.log("updated Data",updatedUser);
    res.status(201).json({
        _id:updatedUser._id,
        name: updatedUser.name,
        email:updatedUser.email,
    });
}else{
      res.status(401).json({message:' Failed!'});
}
});

const authUser = asyncHandler(async(req,res) => {
    const {email,password} =req.body;
    console.log("Indside auth user ::",req.body)
    const user =await User.findOne({email});
    if(user.isAdmin){
        console.log("Admin...");
        res.status(400);
        throw new Error("You are not a Authorized User !");
    }
    const pwd = await bcrypt.compare(password,user.password);
    if(user && pwd){
         generateToken(res,user._id);
         res.status(201).json({
             _id:user._id,
             name: user.name,
             email:email,
         });
    }else{
        res.status(401);
        throw new Error('Invalid credentials !!');
    }
});
const setProfileImage = asyncHandler(async(req,res) => {
    console.log('Update Profile !!!!');
    const image = req.body.image;
    const id = req.user._id; 
    await User.findByIdAndUpdate(id,{image:image});
});

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    setProfileImage,
}