const jwt = require("jsonwebtoken");

async function verifyUser(req,res,next){
  try {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token,process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

module.exports = verifyUser;