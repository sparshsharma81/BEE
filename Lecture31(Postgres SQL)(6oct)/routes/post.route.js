const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.post("/create", async (req, res) => {
  try {
    const { title, description, userId } = req.body; 
    const post = await prisma.post.create({
        data: {
            title,
            description,
            authorId: userId
        }
    })
    res.status(201).json({ post });
    

  }
  catch(error){
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;