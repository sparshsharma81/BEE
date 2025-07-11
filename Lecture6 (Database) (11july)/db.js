const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myProject';
async function main(){
    await client.connect();
    console.log("Connected successfully");
    const db = client.db(dbName);
    const collection = db.collection
}