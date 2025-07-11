const express = require("express");
const app = express();
const PORT = 5000; 
require("dotenv").config();

const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'myProject';
async function connectDb(){
    await client.connect();
    console.log("Connected successfully");
    const db = client.db("BEE -11july");
    const collection = db.collection
    return 'done';
}
const client = new MongoClient(process.env.DB_url);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//urlendcoded --- form data ko encode karne ke liye ...

app.get("/",(req,res)=>{

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