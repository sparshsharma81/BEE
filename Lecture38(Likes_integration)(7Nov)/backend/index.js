const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const socket = require("socket.io");
const {v4: uuid} = require("uuid");
const io = socket(server,{
  cors:{
    origin:"http://localhost:3000",
  }
});
const PORT = 5000;
const path = require("path");

app.use(cors({
  origin:"http://localhost:3000",
  methods:"POST, GET"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

const Users = {};

//  post - > {
  // author  -> user
  // content  ->string
  // likes -> [user]
  // createdAt -> date 
// }
const posts = []

io.on("connection",(client)=>{
  console.log("User 1 connected -> ",client.id);
  
  client.on("register",(userName)=>{
    Users[userName] = client.id
  })
})

app.get("/post/all",async(req,res)=>{
  try{
    res.status(200).json({posts: posts});
  }catch(error){
    res.status(401).json({message:error.message});
  }
})
app.post("/post/create",async(req,res)=>{
  try{
    const {username, content} = req.body;
    const post = {
      id : uuid(),
      author: username,
      content,
      likes:[], //initially likes me empty array-hoga..zero array
      createdAt : new Date()
    }
    posts.unshift(post);
    //push is to put the element at the start of array
    //meanwhile unshift is put the element at the starting index
    res.status(201).json({post:post});
  }catch(error){
    res.status(401).json({message:error.message});
  }
})

app.post("/post/like/:id/:username",async(req,res)=>{ 
  try{
    const {id,username} = req.params;
    posts = posts.map((post)=>{
      if(post.id === id && !post.likes.includes(username)){
        post.likes.push(username);
      }
        return post;
    })
    const post = posts[id];

  }
  catch(error){
    res.status(401).json({message:error.message});

  }
})

app.get("/", (req, res) => {
  res.send("server running");
});

server.listen(PORT, () => console.log("Server running on port " + PORT));