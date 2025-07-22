const mongoose = require('mongoose');

//ye basically process.env.MONGO_URI se connect hoga
async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = connectDb;
