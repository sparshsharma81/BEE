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


//first we apply order by and then decide ki konse field k accoring karna hia 
router.get("/all", async (req,res)=>{
  try{
    const users = await prisma.post.findMany({
      include : { posts : true},
      orderBy : {createdAt : 'desc'}
    })
    res.status(200).json({ users });
  }
  catch(error){
    res.status(400).json({ message: error.message });
  }
})
 

//next we are doing pagination  
//there are two ways to do pagination
//1. using skip and take
//2. using cursor based pagination

///there are two ways ..pagination and infinite scrolling 
//pagination is when we have pages and we can go to next page or previous page
//infinite scrolling is when we scroll down and more data is loaded automatically



router.get("/pagenation", async (req,res)=>{
  try{
    const {page=1,limit=20} = req.query;
    //this simply means that on the first page...like the page will start from 1 
    //and there are 20 images limit on the page 
//like these are the default values ..
//liike if the client has not shared the default valuess..then in this case..it might throw error... so we are using a default values 

const skipCount = (page -1) * limit;

    const posts = await prisma.post.findMany({
      include: {
        author : true,
        comments : true 
      },
      take : limit ,
      //this is like ek baar me kitna data leke aayega
      //that is take 
      ///and the next important thing is called skip 

      skip : skipCount

    })
    res.status(200).json({posts})


  }catch(error){
    res.status(400).json({message:error.message})
  }
})


module.exports = router;