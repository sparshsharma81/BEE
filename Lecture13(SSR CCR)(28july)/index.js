const express = require("express"); // Importing express
const app = express(); // Creating an instance of express 
const Port = 3000; // Defining the port number 

const path = require("path"); // Importing path module for handling file paths 
//path module helps in resolving directory paths..basically providing the path of directories

app.use(express.static(path.join(__dirname, "public"))); // Serving static files from the 'public' directory 
//koi bhi request joki get route pr hogi..--home route..to vo public folder pr direct ho jayegi...
//path.join(__dirname, "public") resolves the path to the public directory relative to the current file's directory 
//basicallyy ye ensure karta hai ki hamesha sahi path resolve ho chahe app kisi bhi directory me ho 

// app.use(express.static ---- ye basically api request ko public folder me direct kar dega...);

app.use(express.json()); // Middleware to parse JSON bodies 
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get("/", (req, res) => { // Root route handler
  res.send("Welcome to the SSR and CCR Lecture!"); // Sending a welcome message
});


//ye niche about ..ye basically ek api hai..
app.get("/about", (req, res) => { // About route handler
    let user = {
        name : "John Doe",
        age: 30,
        email:"johndoe@gmail.com"
    };
    res.status(201).json({user}); // Sending user data as JSON response
});

app.get("/contact",(req,res)=>{
    //we can use send file also here
    res.redirect()("/about"); // Redirecting to the about route
    //res.redirect() will redirect the user to the about route
})

app.listen(Port, () => { // Starting the server
  console.log(`Server is running on http://localhost:${Port}`); // Logging the server
}); // URL



/*
api req. "/" --- will look for index.html file in public folder 
//if we do not make index.html file in public folder then it will direct to the root route handler

api req "/" -- it will look for index.html file in public folder and will return the file as response


in public folder..if we make another file instead of index.html...for example home.html
//then we have to change the get request in app.js file to look for home.html file
//app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "public", "home.html")); });

//basically the index.html file is not present ...then it will simply go to app.get("/") route handler 
and will follow the other logic defined in that route handler 
*/