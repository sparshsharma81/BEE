const express = require('express');
const app = express();
const PORT = 4000;
app.use((req,res,next)=>{
    console.log("This is generic middleware");
next();

});

app.get("/",(req,res)=>{
    console.log("home route");
    res.send("OK");
});

app.use("/user",(req,res,next)=>{
    console.log("/user path middleware");
    next(); // next krne se ye agle wale middleware pr shift ho jayega


});
//agar koi bhi request /user se start hoti hai..to ye wala middleware run hoga...



///now this is app specific middleware 
function userVerify(req,res,next){
//since we are making it for a function purpose ...so we will pass all the three parameters...
console.log("The api specific middleware is workking");
next(); //ab ye agle wale middleware pr shift ho jaayega..

}

const genericMid = (req,res,next)=>{
    console.log("generic middleware");
    next();
}
//this way..we are segragating the middlewares ...

app.get("/user",userVerify,(req,res)=>{
    console.log("/the verify middleware is working");
})

app.use(genericMid);
app.get("/user",(req,res)=>{
    console.log("App is working on browser");
    res.send("working middleware");
})

//like in the above two case...if we write req,res,next --- then both of our api are running 
//next will run the next middleware ..
//like first the /user middleware will run ..and below it..the next /user -- which is same..it will also run 



// PURA EXPRESS MIDDLEWARE SE BHARA HUA HAI...././././.
app.listen(PORT,()=>{
    console.log(`app live on ${PORT}`)

})
