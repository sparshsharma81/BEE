const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true,
        trim: true 
    },
    price:{
        type:Number,
        min : 9,
        required:true
    },
    description:{
        type:String,

    },{
        timestamps : true
    
})
const Product = mongoose.model("Product",productSchema);
model.exports = Product;