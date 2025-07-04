const express = require('express');
const app = express();

const PORT = 4000;

app.get("/",(req,res)=>{
    console.log(req.query);
    res.status(200).send("chal gaya bhai");
})

app.listen(PORT,()=>{
    console.log("The output is working properly");
    // res.status(200).send("Things are working");
})