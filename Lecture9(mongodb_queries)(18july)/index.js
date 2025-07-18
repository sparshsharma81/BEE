const express = require("express");
const app = express();
const PORT = 5000; 
require("dotenv").config();

// const {MongoClient} = require('mongodb');

const mongoose = require('mongoose');
const db = require('./db/connectDb');
const { ObjectId } = require("mongodb"); // Make sure this is at the top
const url = 'mongodb://localhost:27017';

let userCollection;

const dbName = 'myProject';
async function connectDb(){
    try{

   await client.connect(); //we do not want this function to run multiple times..so we have called it in app.js

        console.log("✅ Connected to MongoDB");

        // client.db--- ye basically folder create kar dega..
        const db = client.db("BEE-11july"); // Make sure there is no space in name unless intended
        userCollection = db.collection("users"); // Assign your collection here

        /*
             const db = client.db("Pijush-Kaur-yashu-varun-"); // Make sure there is no space in name unless intended
        userCollection = db.collection("naam nhi batara me"); // Assign your collection here
        */
    }
    
    catch(error){
        console.log("Bhai mongodb connect nhi hua");
    }
}
// const client = new MongoClient(process.env.DB_url);
// const mongo = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        maxLength:16,
        required:true //makes an attribute compulsory


    },
    email:{
        type:String,
        required:true,
        unique:true ///this means that no 2 email can be same 
        //it can not be duplicate --- it is primary key

    },
    age:{
        type:Number,
        required:true,
        min:10
    },
    message:{
        type:String
        
    }

})

const User = mongoose.model("User",userSchema);
//this line will create a schema of the user collection 
// the collection is stored in user variable..
//so we can perform operation im this user variable 

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//urlendcoded --- form data ko encode karne ke liye ...

app.get("/",(req,res)=>{

})
app.post("/user",async (req,res)=>{
    try{
const {name,email,password,message}= req.body;
const result = await userCollection.insertOne({name,email,password,message});
//await basically jabtak kaam khatam nahi hota..tab tak wait karega...
res.status(201).json({result});

    }
    catch(error){
        console.log("Error is running");
    }
})

app.post("/user/create",async (req,res)=>{
    try{
        const {name,email,age,message} = req.body;
        const user = await User.create({
            name,
            email,
            age,
            message
        })
        res.status(201).json({user});

    }catch(error){
                res.status(500),json({message:error.message});
            }
        }

    )

 app.put("/user/update/:id",async(req,res)=>{
            try{
                const {id} = req.params;
                const {name,age} = req.body;
                const result = await User.findByIdAndUpdate(id,{name:name,age:age});
                //ye basically id se document ko find karne k liye hota hai
                // const result = 
                res.status(200).json({message:"User updated Successfully",result});


            }
            catch(error){
                res.status(500),json({message:error.message});
            }
        })
        /*
        const user = new User({              ------this uses to create document only
        name,
        email,
        age})



        await user.save() ----- this will save the document 
        */


        //put is used to update the already updated data 

        /*
        
        connectDb().then(()=>{ })
        */

    

app.get("/create",async(req,res)=>{
    const user1 = await User.create({
        name:"user 1",
        email : "user1@gmail.com",
        age : "200" //age is optional because we have not put required true in that 

    })
    res.status(201).json({user1});
});
app.post("/users",async(req,res)=>{
    try{
        const {users} = req.body;
        const result = await userCollection.insertMany(users);
        res.status(201).json({result});

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


app.delete("/user/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        // const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
        const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

        res.status(201).json({result,message:"user deleted successfully"});
        // all the documents with _id ---they will get deleted..but id is unique..so only one is deleted...
        //we can also pass with name --- then all the document with certain names are deleted 

    }
    catch(error){
        res.status(500).json({message:error.message});        
    }
})

app.listen(PORT,()=>{
    console.log("The server is running");
    //here since it is a asynchronous function..so we will use.then and .catch
    db().then(()=>{ 
        //.then ---basically agar database successfully connect ho jata hai..to ye message send karega
        console.log("The db is running.....");
    }).catch((err)=>{
        console.log("error is"+ err);
    });//here we have the db..so that the database is opened only once..

    console.log("Server is running");


})