///now we are tryping to implement the payment system 

const express = require("express");
const verifyUser = require("../middleware/verify.middleware");
const { verifyGoldUser } = require("../middleware/verify.premium.middleware");
const router = express.Router();
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");
const { verify } = require("jsonwebtoken");


router.post("/package/buy",verifyUser, async (req,res)=>{
    try{
        const {package} = req.query;
        if(!package)throw new Error("package name is required");
        const currUserId = req.user.id;

        const user = await User.findById(currUserId);
        user.package = package;

        if(package == "gold"){
            user.credits+=500;
        }
        if(package == "platinum"){
            user.credits +=1000;
        }
        await user.save();
        res.status(200).json({message:"package brought successfully"});
    }catch(error){
        res.status(500).json({message:error.message});        
    }
})

router.get("/apply/discount/:productId", async(req,res)=>{
    try{
        const {productId} = req.params;
        const userId = req.user.Id;
        const [user, product] = await Promise.all([
            await User.findById(userId),
            await Product.findById(productId)
        ]);

        if(user.credits - (product.price * 0.2) <0){
            throw new Error("Not enough credit");
        }

        //promise.all --- it runs all the promise parallelly 
        //promise.raise , promise.apply
        /*
        Promise.allSettled() is a method that returns a promise that resolves after all 
        of the given promises have either fulfilled or rejected, with an array of objects describing the outcome
         of each promise. It doesn't fail early like Promise.all().

Promise.any() is a method that returns a promise that fulfills with the value of the
 first promise in an iterable that fulfills. It short-circuits as soon as a promise is
  fulfilled. If all of the promises reject, the returned promise rejects with an AggregateError.

Promise.race() is a method that returns a promise that fulfills or rejects as soon as
 one of the promises in an iterable fulfills or rejects.
  The outcome is determined by the first promise to settle, regardless of whether it's a fulfillment or a rejection.

  PROMISE -- IT IS A SET OF CODE WHICH RUNS PARALLELLY ALONG WITH OTHER JAVASCRIPT CODE 

        */
        const discountedPrice =product.price - (product.price * 0.1);
        user.credits -= (product.price * 0.1);
        await user.save();

        res.status(200).json({newPrice:discountedPrice});
        //Promise.all() -- this will give a array of promices it runs all the promise parallelly
        //it reduces time 

        //this will run parallelly 

    }catch(error){
        res.status(500).json({message:error.message})
    }
})

const product = [
    {
        name: "product 1",
        price: 1999,
        description :"This is product 1"
    },
    {
         name: "product 2",
        price: 2999,
        description :"This is product 2"
    },
    {
         name: "product 3",
        price: 3999,
        description :"This is product 3"
    }
]


router.get("/platinum/discount/:productId", async(req,res)=>{
    try{
        const {productId} = req.params;
        const userId = req.user.Id;
        const [user, product] = await Promise.all([
            await User.findById(userId),
            await Product.findById(productId)
        ]);

        if(user.credits - (product.price * 0.2) <0){
            throw new Error("Not enough credit");
        }

        //promise.all --- it runs all the promise parallelly 
        //promise.raise , promise.apply
        /*
        Promise.allSettled() is a method that returns a promise that resolves after all 
        of the given promises have either fulfilled or rejected, with an array of objects describing the outcome
         of each promise. It doesn't fail early like Promise.all().

Promise.any() is a method that returns a promise that fulfills with the value of the
 first promise in an iterable that fulfills. It short-circuits as soon as a promise is
  fulfilled. If all of the promises reject, the returned promise rejects with an AggregateError.

Promise.race() is a method that returns a promise that fulfills or rejects as soon as
 one of the promises in an iterable fulfills or rejects.
  The outcome is determined by the first promise to settle, regardless of whether it's a fulfillment or a rejection.

  PROMISE -- IT IS A SET OF CODE WHICH RUNS PARALLELLY ALONG WITH OTHER JAVASCRIPT CODE 

        */
        const discountedPrice =product.price - (product.price * 0.1);
        user.credits -= (product.price * 0.1);
        await user.save();

        res.status(200).json({newPrice:discountedPrice});
        //Promise.all() -- this will give a array of promices it runs all the promise parallelly
        //it reduces time 

        //this will run parallelly 

    }catch(error){
        res.status(500).json({message:error.message})
    }
})



router.get("/gold/discount/:productId",verifyUser,verifyGoldUser, async(req,res)=>{
    try{
        const {productId} = req.params;
        const userId = req.user.Id;
        const [user, product] = await Promise.all([
            await User.findById(userId),
            await Product.findById(productId)
        ]);

        if(user.credits - (product.price * 0.2) <0){
            throw new Error("Not enough credit");
        }
        const discountedPrice =product.price - (product.price * 0.1);
        user.credits -= (product.price * 0.1);
        await user.save();

        res.status(200).json({newPrice:discountedPrice});
        
       

    }catch(error){
        res.status(500).json({message:error.message})
        console.log(error);
    }
})

// router.get("/platinum/discount/")

// router.get("/gold/discount/:productId",verifyUser,verifyGoldUser,async (req,res)=>{

// })

router.get("/create/products",async (req,res)=>{
    try{
        const allProduct = await Product.insertMany(product);
        res.status(200).json({products:allProduct});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

router.get("/platinum/discount/:productId", async(req,res)=>{
    try{
        const {productId} = req.params;
        const userId = req.user.Id;
        const [user, product] = await Promise.all([
            await User.findById(userId),
            await Product.findById(productId)
        ]);

        if(user.credits - (product.price * 0.2) <0){
            throw new Error("Not enough credit");
        }

        //promise.all --- it runs all the promise parallelly 
        //promise.raise , promise.apply
        /*
        Promise.allSettled() is a method that returns a promise that resolves after all 
        of the given promises have either fulfilled or rejected, with an array of objects describing the outcome
         of each promise. It doesn't fail early like Promise.all().

Promise.any() is a method that returns a promise that fulfills with the value of the
 first promise in an iterable that fulfills. It short-circuits as soon as a promise is
  fulfilled. If all of the promises reject, the returned promise rejects with an AggregateError.

Promise.race() is a method that returns a promise that fulfills or rejects as soon as
 one of the promises in an iterable fulfills or rejects.
  The outcome is determined by the first promise to settle, regardless of whether it's a fulfillment or a rejection.

  PROMISE -- IT IS A SET OF CODE WHICH RUNS PARALLELLY ALONG WITH OTHER JAVASCRIPT CODE 

        */
        const discountedPrice =product.price - (product.price * 0.1);
        user.credits -= (product.price * 0.1);
        await user.save();

        res.status(200).json({newPrice:discountedPrice});
        //Promise.all() -- this will give a array of promices it runs all the promise parallelly
        //it reduces time 

        //this will run parallelly 

    }catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = router;
