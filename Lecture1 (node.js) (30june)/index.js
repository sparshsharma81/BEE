const express = require('express');
const app = express(); //hamne express ko call kra hai
const PORT = 4000;
app.post("/user",(req,res)=>{
    console.log("Hello");
    res.send("Hello");
});
app.get("/",(req,res)=>{
    res.send("This is the home page");
})
app.get("*",(req,res)=>{
    res.send("This is the default port");
})
app.listen(PORT,()=>{
    console.log(`${PORT}`);
});
//this is a arrow function or callback function
