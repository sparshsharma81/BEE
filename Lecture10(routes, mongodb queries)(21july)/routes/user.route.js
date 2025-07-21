//yaha pr saari post and put ki api hai 
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const connectDb = require("../config/db");


//basically iss folder k andar hame put aur get aur ye sab daalte hai
router.post("/user/create",async (req,res)=>{
    try{
        const {name,email,age,message} = req.body;
        const user = await User.create({
            name,
            email,
            age,
            message
        })
        res.status(201).json({user});

    }catch(error){
                res.status(500),json({message:error.message});
            }
        }

    )

    router.put("/user/update/:id",async(req,res)=>{
            try{
                const {id} = req.params;
                const {name,age} = req.body;
                const result = await User.findByIdAndUpdate(id,{name:name,age:age});
                //ye basically id se document ko find karne k liye hota hai
                // const result = 
                res.status(200).json({message:"User updated Successfully",result});


            }
            catch(error){
                res.status(500),json({message:error.message});
            }
        })
        /*
        const user = new User({              ------this uses to create document only
        name,
        email,
        age})



        await user.save() ----- this will save the document 
        */


        //put is used to update the already updated data 

        /*
        
        connectDb().then(()=>{ })
        */

    

router.get("/create",async(req,res)=>{
    const user1 = await User.create({
        name:"user 1",
        email : "user1@gmail.com",
        age : "200" //age is optional because we have not put required true in that 

    })
    res.status(201).json({user1});
});
router.post("/users",async(req,res)=>{
    try{
        const {users} = req.body;
        const result = await User.insertMany(users);
        res.status(201).json({result});

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

module.exports = router; //ye basically hamne apne route wale folder se export kiya hai
