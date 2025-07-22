const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true //this makes the task field compulsory ///chup chap likh
    },
    status:{
        type: Boolean,
        default : false
    }
 
},
{
    timestamps: true //this will add createdAt and updatedAt fields automatically
});

// );
// const Todo = mongoose.model("Todo", todoSchema);
module.exports = mongoose.model("Todo", todoSchema);



/*
DIFFERENCE BETWEEN MODEL AND SCHEMA:
- Schema is a blueprint for the data structure, defining the fields and their types. 
-model is a compiled version of the schema that allows you to interact with the database.


mongoose.model('Todo', todoSchema) creates a model named 'Todo' based on the todoSchema.
//ye wala function collection create karege...
aur fir module.exports se use export krege ham

*/