const express = require('express');
const app = express();
const PORT = 5000;

//we can not install prisma directly -- like not with npm i prisma
//we need to completely do the setup of prisma 
//the command is npx prisma init 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoute = require('./routes/user.route');


app.use("/user",userRoute);
app.use("/post",require("./routes/post.route"));


app.get("/",(req,res)=>{
    res.send("Welcome to the User API");
})

app.listen(PORT,()=>{
    console.log(`the server is running on http://localhost:${PORT}`);
})
