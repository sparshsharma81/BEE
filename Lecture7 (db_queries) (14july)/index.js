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

   await client.connect();
        console.log("✅ Connected to MongoDB");

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

app.listen(PORT,()=>{
    console.log("The server is running");
    //here since it is a asynchronous function..so we will use.then and .catch
    connectDb().then(()=>{
        console.log("The db is running.....");
    }).catch((err)=>{
        console.log("error is"+ err);
    });//here we have the db..so that the database is opened only once..

    console.log("Server is running");


})