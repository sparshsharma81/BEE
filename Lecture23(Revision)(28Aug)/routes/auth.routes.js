const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/verify.middleware");
const verifyAdmin = require("../middleware/verifyAdmin.middleware");

router.post("/signup",async (req,res)=>{
  try {
    let {name,email,password} = req.body;
    if(!name || !email || !password){
      throw new Error("All fields are required");
    }
    const hashPass = await bcrypt.hash(password,10);

    let user = await User.create({
      name:name,
      email:email,
      password:hashPass
    })
    res.status(200).json({message:"user signup successfull",user})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.post("/admin/signup",async(req,res)=>{
  try {
    let {name,email,password} = req.body;
    if(!name || !email || !password){
      throw new Error("All fields are required");
    }
    const hashPass = await bcrypt.hash(password,10);

    let user = await User.create({
      name:name,
      email:email,
      password:hashPass,
      role:"admin"
    })
    res.status(200).json({message:"user signup successfull",user})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.post("/login",async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email:email}).select("+password");
    if(!user){
      throw new Error("Invalid email or password")
    }
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
      throw new Error("Invalid email or password")
    }
    const token = jwt.sign({id:user._id,name:user.name,email:user.email},
      process.env.JWT_SECRET,{expiresIn:'1h',algorithm:"HS256"}
    )
    res.cookie("token",token,{httpOnly:true,secure:false,domain:"localhost",path:"/",maxAge:24*60*60*1000});
    // res.status(200).json({message:"user loggedin successfull"})
    res.status(200).json({message:"user loggedin successfull",token})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

// can access anyone
// router.get("/check",async (req,res)=>{
//   try {
//     res.status(200).json({message:"welcome user"})
//   } catch (error) {
//     res.status(400).json({message:error.message});
//   }
// })

// logged in user only
router.get("/check",verifyUser,async (req,res)=>{
  try {
    // const authorization = req.headers.authorization;
    // const token = authorization.split(" ")[1];
    // const payload = jwt.verify(token,process.env.JWT_SECRET)
    // res.status(200).json({message:"welcome user",user:payload})
    res.status(200).json({message:"welcome user",user:req.user})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

router.get("/info",verifyUser,verifyAdmin,async (req,res)=>{
  try {
    let users = await User.find({role:{$ne:"admin"}});
    res.status(200).json({users});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

module.exports = router;