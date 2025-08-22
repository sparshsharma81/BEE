async function verifyGoldUser(req,res,next){
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(user.package !="gold" && user.package !="platinum"){
            throw new Error("You don't have access");
        }
        next();
    }
    catch(error){
        res.status(400).json({message.error.message});
    }
}

async function verifyPlatinumUser(req,res,next){
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(user.package !="gold" && user.package !="platinum"){
            throw new Error("You don't have access");
        }
        next();
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
}

module.exports = {verifyGoldUser,verifyPlatinumUser};