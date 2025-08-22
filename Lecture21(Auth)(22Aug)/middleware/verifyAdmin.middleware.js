const User = require("../models/user.model");

async function verifyAdmin(req,res,next){
  try {
    const currUserId = req.user.id;
    const currUser = await User.findById(currUserId).select('+role');
    if(currUser.role != 'admin'){
      throw new Error("You are not Authorized")
    }
    next();
  } catch (error) {
    res.status(400).json({message:error.message});
  }
}

module.exports = verifyAdmin;