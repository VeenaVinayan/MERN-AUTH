//route POST /spi/users/auth
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password } = req.body;
    console.log('Inside register user !!');
    console.log(req.body);
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error('User already Exists... !!');
    }
    const user = await User.create({
         name,
         email,
         password,
    });
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
// access private
const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    });
    res.status(200).json({message:'Logged User !!'});
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
// PUT /api/user/profileUpdata
const updateUserProfile = asyncHandler(async(req,res) => {
    console.log('Inside get user Profile--Update !');
    const user = await User.findById(req.user._id);
    if(user){
         user.name = req.body.name || user.name;
         user.email = req.body.email || user.email;
    
    if(req.body.password){
        user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json('Update  User Profile  !!');
}else{
      res.status(401).json({message:'Invalid !'});
}
});
const authUser = asyncHandler(async(req,res) => {

    const {email,password} =req.body;
    console.log(req.body);
    const user =await User.findOne({email});
    if(user && (await user.matchPassword(password))){
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

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}