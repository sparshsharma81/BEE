const express = require("express");
const connectDb = require("../db/connectDb");
const app = express();
const PORT = 5000;

require("dotenv").config();

const authRouter = require("./router/auth.routes");


app.use(express.json());
app.use("/auth",authRouter);
app.use(express.urlencoded({extended: true}));
app.get("/",(req,res)=>{

})
// app.listen(PORT,()=> console.log("Server is running on port " + PORT));

connectDb().then(()=>{
    app.listen(PORT,()=>console.log("Server is running on port" + PORT));

}).catch((error)=>console.log(error));