function generateotp(len){
    try{
        let otp = "";
        for(int i=0;i<len;i++){
            otp+=(Math.random() * 10)
        }

    }
    catch(error){
        throw error;
    }
}


//it will generate an error 
function verifyOtp(userOtp){
    try{
        if(otp == userOtp)return true;
    
    throw new Error ("otp not matched");
    }

catch(error){
    throw error;
}

module.export = 