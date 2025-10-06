const express = require("express");
const router = express.Router();

const prisma = require("../prisma/client");


router.post("/create",async (req,res)=>{
    try{
        const{name,email}=req.body;
        const user = await prisma.user.create({
            data:{
                name,
                email
            }
        });
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({message: error.message});
    }
})


module.exports = router;