//we need to make comment route
//like when we do the get data
//then it has printers..so for that we need to make comment 

const express = require('express');
const prisma = require('../prisma/client'); // Adjust the path as necessary
const router = express.Routuer();

router.post("/create",async (req , res)=>{
    try{
        const {comment,userId} = req.body;
        const post = await prisma.comment.create({
            data:{comment,authorId:userId}
        });
        res.status(201).json(post);
    }catch(error){
        console.error("Error creating comment:", error);
        res.status(500).json({error:"Internal server error"});
    }


})

router.get('/all', async (req, res) => {
    try{

        const allPosts = await prisma.post.findMany({
            include: { comments: true, author: true }
            //in mongodb we use populate ..now in prisma we use include
        });
        res.status(200).json(allPosts);
    }
    catch(error){
        res.status(500).json({error:"Internal server error is comming in this"});

    }
})
module.exports = router;