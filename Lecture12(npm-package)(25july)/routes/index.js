const express = require("express");
const { url } = require("inspector");
const app = express();
const PORT = 5000;
const {generateOtp , verifyOtp} = require("@sparshsharma81/otp");

app.use(express.json());
app.use(express.urlencoded{extended:true});
app.get("/",(req,res)=>{

});

app.get("/otp/generate",(req,res)=>{
    try{
        let otp = generateOtp(4);
        res.status(200).json({otp});

    }catch(error){
        res.status(500).json({message:error.message});
    }
})
app.listen(PORT,()=>console.log(`server is working on ${PORT}`));