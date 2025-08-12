//we have to install the mongoose

const mongoose = require("mongoose");
const { applyTimestamps } = require("../../../Lecture17(Todo)(11Aug)/Model/model");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true;

    },
    email;{
        type:String,
        required:true;
        unique:true;
    },
    password{
        type:String,
        required:true,
        select:false
        //user.findOne -- this method will find the user 
        //if we write select:false -- this field will not be available in the findOne();
    }
},{
    timestamp:true;
    //this will provide createdAt and updatedAt 
});

const User = mongoose.model("User",userSchema);
module.exports = User;