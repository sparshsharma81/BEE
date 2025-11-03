const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const socket = require("socket.io");
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

app.post("/post/create",async(req,res)=>{
  try{
    const {username, content} = req.body;
    const post = {
      author: username,
      content,
      likes:[], //initially likes me empty array-hoga..zero array
      createdAt : new Date()
    }
    posts.unshift(post);
    //push is to put the element at the start of array
    //meanwhile unshift is put the element at the starting index
    res.status(201).json({post:Posts});
  }catch(error){
    res.status(401).json({message:error.message});
  }
})

app.get("/", (req, res) => {
  res.send("server running");
});

server.listen(PORT, () => console.log("Server running on port " + PORT));