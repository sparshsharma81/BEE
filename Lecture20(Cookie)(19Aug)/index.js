const express = require('express');
const path = require('path');
const app = express(); 
const mongoose = require('mongoose');
const PORT = 3000;
const db = require('./db/connectDb.js');
const model = require('./Model/model.js'); // through this..we will import the model
const todoRoute = require('./routes/todo.route.js'); // Importing the todo route......
app.use(express.static(path.join(__dirname, "public"))); 

const todoRouter = require('./routes/todo.route.js'); // Importing the todo route
const connectDb = require('./db/connectDb.js');

app.use(express.json()); //this is the middlware to parse the json data which was received ..

//routers 
app.use("/todo", todoRouter); // this is the route for the todo api
// this will handle all the requests to the /todo route


app.get('/', (req, res) => {
  res.redirect('index.html'); // Redirecting to index.html in the public folder
});
app.use('/api/todos', todoRoute);

app.post('/api/login', (req, res) => {
  // Assume user authentication is done here
  res.status(200).json({ message: "Login successful" });
});

const User = require('../models/user.model');

connectDb().then(() => {
    app.listen(PORT,() => {
        console.log(`server running live http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})

/*
API INTEGRATION -- -CONNECTING FRONTEND AND BACKEND 

*/