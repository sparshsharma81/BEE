const express = require("express");
const router = express().Router();
const User = require("../models/user.model");

const bcrypt = require("bcrypt");

router.post("/signup",async(req , res)=>{
    try{
        let {name,email,password} = req.body;
        //get can send the data in url which are easily hackable..
        //so we are using post...in which the data are not in url and is not hackable
        if(!name || !email || !password){
            throw new Error("All fields are required");

        }

        const hashPass = await bcrypt.hash(password,10);
        //here 10 is the layer of hashing...like we need to hash it to 10 levels
        // here 10 is salt round -- which is maximum to 31 --
        //the more the salt rounds ...the more time it takes to decrypt the password

        //we will send the error that all fields are required
        //we need to write the code for it 
        // it is maximum 31 --- it takes 2-3 days to debug 
        // it does 2 power n times for hashing 

        //this 10 is ideal value 

        //here hash is 2 power 10 times 




        let user = await User.create({
            name:name,
            email:email,
            password : hashPass
        });
        res.status(200).json({message:"User signup successful"});

    }
    catch(error){
        res.status(500).json({message:"Life has problems"});
    }
})


module.exports = router;