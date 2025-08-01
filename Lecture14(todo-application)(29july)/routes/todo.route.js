const express = require('express'); 
const mongoose = require('mongoose');
const PORT = 3000;

const router = express.Router(); //hamne ye router banaya hai taki hum apne routes ko alag se likh sakein 

router.get('/', (req, res) => {
  res.send('Todo List API');
});
router.get('/todos', async (req, res) => {
    try {
        const todos = await mongoose.model('Todo').find(); //ye find function se hamne sabhi todos ko find kiya hai
        res.status(200).json(todos); //200 mtlb maksad pura
    } catch (error) {
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
});
router.post('/create', async (req, res) => {
    try{
        const {task} =req.body;//ye body se query params se data le raha hai
        const todo = await mongoose.model('Todo').create({ task }); //ye create function se hamne todo ko create kiya hai
        res.status(200).json({ message: "Maksad pura" });
    }
    catch(error) {
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
});
router.post('task/add', async (req,res) => {
    try {
        const { task } = req.body; //ye body se hamne task ko liya hai
        const todo = await mongoose.model('Todo').create({ task }); //ye create function se hamne todo ko create kiya hai
        res.status(201).json(todo); //201 mtlb created successfully
    } catch (error) {
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
});
router.get("task/search",async(req,res)=>{
    try{
        const{task} =req.query;//ye query se hamne task ko liya ha}
        const todos = await mongoose.model('Todo').find({ task: { $regex: task, $options: 'i' } }); //ye find function se hamne todos ko find kiya hai
        res.status(200).json(todos); //200 mtlb maksad pura 
    }
    catch(error){
        res.status(501).json({ message: error.message }); //pehli fursat me nikkal
    }
})

router.delete("/api/delete/:id", async (req, res) => {
    try{
        const {id} = req.params; //ye hai params...
        const result = await mongoose.model('Todo').findByIdAndDelete(id); //ham todo naam ka model banayege...
        //findByIdAndDelete -- ye basically mongon db ka function hai jisse ham document ko delete krege..
        if (result) {
            res.status(200).json({ message: "Todo deleted successfully" });
            //200 mtlb maksad pura
        }
    }catch (error) {
        res.status(500).json({ message: error.message });
        //pehli fursat me nikkal
    }
})

module.exports = router;
