import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const adminLogin = async (req,res) =>{
    const {email,password} = req.body;
    console.log("Inside  admin Login ::",email,password);
    if(process.env.ADMIN_USERNAME === email && process.env.ADMIN_PASSWORD === password){
        generateToken(res,'admin1234');
        res.status(201).json({message:'User Created !!'});
    }else{
        res.status(401).json({message:'Invalid Credentials !!'});
    }
}
const adminDashboard = async (req,res) => {
    const user = await User.find();
    console.log(user);
     res.status(201).json({user:user});
}
const deleteUser = async (req,res) => {
   try {
        const { userId } = req.body;
        console.log(userId);
        const result = await User.deleteOne({_id:userId});
        console.log(result);
        res.status(200).json({message:'Successfully Deleted !!'});
   }catch(err){
      console.log(err);
   } 
}

export {
     adminLogin,
     adminDashboard,
     deleteUser,
}