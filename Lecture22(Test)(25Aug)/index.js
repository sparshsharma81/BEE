const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const PORT = 5000;
const path = require("path");

require("dotenv").config();
// router
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.route");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.set("view engine","ejs"); 
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {	
  res.render("hello");
});



connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))