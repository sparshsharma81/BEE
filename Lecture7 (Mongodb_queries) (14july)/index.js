const express = require("express");
const app = express();
const PORT = 5000; 
require("dotenv").config();

const {MongoClient} = require('mongodb');

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
    }
    catch(error){
        console.log("Bhai mongodb connect nhi hua");
    }
}
const client = new MongoClient(process.env.DB_url);

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
        const result = await userCollection.deleteMany({_id:id});
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
    connectDb().then(()=>{ 
        //.then ---basically agar database successfully connect ho jata hai..to ye message send karega
        console.log("The db is running.....");
    }).catch((err)=>{
        console.log("error is"+ err);
    });//here we have the db..so that the database is opened only once..

    console.log("Server is running");


})