const express = require('express');
const app = express();

const PORT = 4000;

app.get("/user",(req,res)=>{
    console.log(req.query);
    
    const UserName = req.query.name;             //this is the normal syntax to extract name 
                                                    //ye basically params ka use kiya hai..?query params ka use hua hai isme...
                                                    //ye basically api se input k liye hota hai..
                                                    //jaise localhost:8000/api/abc?
                                                    /*
                                                http://localhost:3000/profile?user=alice&id=101
                                                This URL has:
                                                ?user=alice&id=101 → query string

                                                user and id → query parameters

                                                alice and 101 → values
                                                    */

    const {name} = req.query;
                                                 // ye basicallly ek objet ki thrah input le lega...

                                                 //destructuring -- extracting of values from query into key 
                                                 //variable name should be same as key name
    console.log(name);
    res.status(200).send("chal gaya bhai");

})

app.use((req,res,next)=>{
    console.log("generic middleware 1");

//next --- it will cal the next middleware after it
//in this case..we have not written next() -- basically so it will break the case..like nothing will gonna work
//if we not use next in the app.use --then our request will get freeze here...


next();
})



app.get("/user/:id",(req,res)=>{
    console.log(req.params);
    res.send(req.params);
    res.send("ok");
})

app.get("/user/:id/:userId",(req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    console.log(id);
    res.send("things are working properly");
})
app.listen(PORT,()=>{
    console.log("The output is working properly");
    // res.status(200).send("Things are working");
})

