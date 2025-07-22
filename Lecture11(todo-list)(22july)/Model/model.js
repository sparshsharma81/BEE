const model = require('mongoose');
// const connectDb = require('../config/db');
 const todoSchema = new model.Schema({
    task: {
        type:String,
        required: true //this makes the task field compulsory ///chup chap likh 
    },
    status:{
        type: Boolean,
        default: false //this means that by default the status will be false 

    }
 })
 module.exports(model.model('Todo', todoSchema)); // Exporting the Todo model