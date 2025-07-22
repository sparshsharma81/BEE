const express = require('express'); //importingn express..ham express ko use karege
const { updateTodo } = require('../controller/todo.controller');


const router = express.Router(); //router ko use karne ke liye 
//ham express se router nikalte hai

// router.post("/", async (req, res) => {
//     try {
//         const {task} = req.body; //data ko body se le rahe hai
//         // const todo = await mongoose.model('Todo').create({ task }); //ye create function se hamne todo ko create kiya hai

//         const todo = await Todo.create({task}); //ye create function se hamne todo ko create kiya hai
//         //basically mongodb me add kr dega...
//         res.status(201).json({ message: "Todo created successfully", todo });
//     }catch (error) {
//         res.status(500).json({ message: error.message }); //pehli fursat
//     }})

router.post('/create',createTodo); //ye createTodo function ko call karega jab bhi post request aayegi /create par)
router.get('/', (req, res) => { //ye get request hai jo / par aayegi
    res.send('Todo List API'); //ye response dega ki Todo List API hai
});
router.delete("/delete/:id", deleteTodo); //ye deleteTodo function ko call karega jab bhi delete request aayegi /delete par

router.put("/update/:id", updateTodo); //ye updateTodo function ko call karega jab bhi put request aayegi /update par

router.get("/search",searchTodo); //ye searchTodo function ko call karega jab bhi get request aayegi /search par

module.exports = router; //ye router ko export karne ke liye 



