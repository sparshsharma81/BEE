const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    select:false   // this field will not be available in user data when we extract a user from DB
  },
  role:{
    type:String,
    enum:["user","admin"],  //possible values of attribute
    default:"user",
    select:false
  },
  package:{
    type :String,
    enums:["free","gold","platinum"],
    default:"free"
  },
  credits:{
    type:Number,
    default:0
  }
  
},{
  timestamps:true  // createdAt and updatedAt fields
});

const User = mongoose.model("User",userSchema);
module.exports = User