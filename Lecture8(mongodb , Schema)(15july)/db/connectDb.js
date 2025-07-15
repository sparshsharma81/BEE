const mongoose = require("mongoose");
async function connectDb(){
     await mongoose.connect(process.env.DB_URL);
    // mongoose.connect(process.env.DB_URL).then(()=>{
    //     console.log("done");
    // })
    //ye parallel me run karega--- promise
    //promise 

    console.log("connected to DB");
}
module.exports = connectDb;
