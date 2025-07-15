const mongoose = require("mongoose");
async function connectDb(){
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to DB");
}
module.export = connectDb;