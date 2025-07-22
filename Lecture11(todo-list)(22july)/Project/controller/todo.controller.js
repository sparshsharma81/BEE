const Todo = require('./models/todo.model'); // Importing the Todo model 
//since we are using todo collection..so we need to import that...
const createTodo  = async (req, res) => {
    try {
        const {task} = req.body; //data ko body se le rahe hai
        // const todo = await mongoose.model('Todo').create({ task }); //ye create function se hamne todo ko create kiya hai

        const todo = await Todo.create({task}); //ye create function se hamne todo ko create kiya hai
        //basically mongodb me add kr dega...
        res.status(201).json({ message: "Todo created successfully", todo });
    }catch (error) {
        res.status(500).json({ message: error.message }); //pehli fursat
    }
}

const deleteTodo = async (req, res) => {
    try {
        const{id} = req.params; //ye hai params...
        const result = await Todo.findByIdAndDelete(id); //ham todo naam ka model
        res.status(200).json({ message: "Todo deleted successfully" }); 
    }catch (error) {    
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
}
const updateTodo = async (req, res) => {
    try {
        const {id} = req.params; //ye params se id ko le raha hai
        // const {task} = req.body; //ye body se task ko le raha hai
        const todo = await Todo.findByIdAndUpdate(id, {status: !todo.status}); //ye update function se hamne todo ko update kiya hai
        res.status(200).json({ message: "Todo updated successfully", todo });
    }catch (error) {
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
}

//query is when the client sends the key and values ---query-- both things are from client side...
//params  --- in which we define the key by ourself ..the value is send by params 


const searchTodo = async (req,res)=>{
    try{
      const {task} = req.query; //ye query se hamne task ko liya hai
        const todos = await Todo.find({ task: { $regex: task, $options: 'i' } }); //ye find function se hamne todos ko find kiya hai
        // $regex is used to search the task in the database
        // $options: 'i' is used to make the search case-insensitive
        //basically regex means vo saari commands laake do..joki task se match karte hai 
        //and i means case-insensitive
        res.status(200).json({ todos, message: { success: true } }); //200 mtlb maksad pura

    }catch (error) {
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }

}

module.exports = {
    createTodo,
    deleteTodo,
    updateTodo,
    searchTodo
}