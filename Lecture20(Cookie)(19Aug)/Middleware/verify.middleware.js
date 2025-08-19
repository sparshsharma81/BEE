const jwt = require("jsonwebtoken");    

async function verifyToken(req, res, next) {
    try{
        const authorization = req.headers.authorization; // Extracting the authorization header
        const token = authorization.split(" ")[1]; // Extracting the token from the header
        const decoded = jwt.verify(token, 'secret'); // Verifying the token
        req.user = decoded; // Storing the user information in the request
        next(); // Calling the next middleware
    }
    catch(error){
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = verifyToken;
