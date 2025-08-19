const User = require('../models/user.model');

async function VerifyAdmin(req,res,next){
    try{
        const currUserId = req.user.id;
        const currUser = await User.findById(currUserId).select("+role");
        if(currUser.role !== "admin"){
            // return res.status(403).json({ message: "Forbidden" });
            throw new Error("You are not authorized");
        }
        next();
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
module.exports = VerifyAdmin;   
   