// const express = require('express');
// const app = express();
//  const PORT = 4000;
 
//   app.post("/",(req,res)=>{
//     console.log("req.body");
//     res.status(201).send("Ok");
//   })
  
//   app.get("/",(req,res)=>{
//     res.send("Home api working");
//     const rest = {
//         name:"vibh",
//         work: null,

//     }
//     res.send(rest);
//   });
//    app.listen(4000,(req,res)=>{
//     console.log("Output is working on the port");
//    })

//    const result = {
//     name: "vibhuti",
//     work:null,
//    }
   


app.use(express.json())
//body ko kis thrah se process karna hai..ye batayega...
const express = require('express');
const app = express();

const PORT = 8000; // Your app is listening on 8000, not 4000

app.use(express.json()); // Middleware to parse JSON in POST requests

// GET route
app.get("/", (req, res) => {
  const response = {
    name: "vibhuti",
    work: null,
  };
  res.status(269).send(response); // You must send the object as the response
});

// POST route
app.post("/", (req, res) => {
  console.log(req.body); // This logs the actual request body
  res.status(269).send("Ok");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
