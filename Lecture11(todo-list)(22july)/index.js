const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const PORT = 3000;
const db = require('./db/connectDb');
const model = require('./Model/model.js'); // through this..we will import the model
const todoRoute = require('./routes/todo.route'); // Importing the todo route......

app.use(express.json()); //this is the middlware to parse the json data which was received ..

app.use('/api/todos', todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});