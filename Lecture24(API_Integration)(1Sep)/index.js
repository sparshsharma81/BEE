const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const PORT = 5000;
const path = require("path");

require("dotenv").config();
const cookieParser= require("cookie-parser");
// router
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.route");
const verifyUser = require("./middleware/verify.middleware");


app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //this will store form data in body

// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.set("view engine","ejs"); 
app.set("views", path.join(__dirname, "views"));

// app.get("/", (req, res) => {	
//   const name = "sparsh"
//   const contacts = [
//     { name: "Contact 1", phone: 9876543210 },
//     { name: "Contact 2", phone: 987654321 }
//   ];
//   res.render("hello", { name, contacts });
// });

app.get("/",verifyUser,async(req , res)=>{
try{
  const product = await Product.find();
  res.render("home",{product});
}
catch(error){
  res.status(500).send("Something went wrong");

}
})

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
