const express = require("express");
const router = express.Router();

const prisma = require("../prisma/client");


router.post("/create",async (req,res)=>{
    try{
        const{name,email}=req.body;
        const user = await prisma.user.create({
            data:{
                name,
                email
            }
        });
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({message: error.message});
    }
})

router.post("/transfer",async(req,res)=>{
    try{
        const {senderId , receiverid, amount} = req.body;
        const transaction = await prisma.$transaction(async(tx)=>{

            //this function is responsive for all the rollback if any error comes in the
            //transactions 
            //like if there is error in the transaction 
            // so this function .$transaction will rollback everything 

            //now in this ..there is a tx..which is very important...which is a instance 
            //of primsa 
            const sender = await tx.user.findUnique({
                //here we have written tx instead of prisma because the prisma instance is blocked at that time 
                //so we are using tx.user ....


                where:{id:senderId}
            })

            //step1 : Balance Check
            if(!sender || sender.balance <= amount){
                throw new Error("Insufficient Balance");

            }

            //Step2 : amount deduction 
            await tx.user.update({
                where:{id:senderId},
      // data:{balance: sender.balance - amount } //this one is a logical approach , if we have sender..then we can do that
                data:{balance: {decrement: amount}} //this one is a better approach
            })


            //step3: update balance of receiver 
            await tx.user.update({
                where:{id:receiverid},
                data:{balance:{increment:amount}}
            })

            //in the upper one..we have decremented..now we need to increment the amount of the receiver

            //step4 : Transaction table entry (history)
            const trnx = await tx.transaction.create({
                data: {
                    senderId,
                    receiverId,
                    amount
                }
            })
            //now we are returning the transaction function  
            return trnx;


            
            //now here we need to do somethings 
        });
        res.status(200).json(transaction);

    } catch(error){
        res.status(400).json({message:error.message});
    }
})

module.exports = router;