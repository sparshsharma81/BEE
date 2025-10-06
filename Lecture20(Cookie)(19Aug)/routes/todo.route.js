const express = require('express'); 
const mongoose = require('mongoose');
const PORT = 3000;

const Todo = mongoose.model("Todo");
const User = mongoose.model("User");

const router = express.Router(); //hamne ye router banaya hai taki hum apne routes ko alag se likh sakein 
const bcrypt = require('bcrypt'); //ye bcrypt hai jo password hashing ke liye use hota hai
const jwt = require('jsonwebtoken'); //ye jwt hai jo token generation ke liye use hota hai
const { $where } = require('../Model/model');
const VerifyAdmin = require('../Middleware/verifyAdmin');

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

router.get("/all",async (req,res)=>{
    try{
        const todos = await mongoose.model('Todo').find(); //ye find function se hamne sabhi todos ko find kiya hai
        res.status(200).json(todos); //200 mtlb maksad pura
    }
    catch(error){
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
});
router.get("/filter",async(req, res) => {
    try {
        const {filterName}= req.query; //ye query se hamne filterName ko liya hai
        if(!filterName){
            throw new Error("Filter name is required"); //agar filterName nahi hai to error throw karega
            //isme me ek self error throw kar raha hu taki agar filterName nahi hai to error aayega
            //aur ye jo throw hoga..vo catch block me jayega...
        }
    }catch(error){
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
    //filterName -- all , active, completed (possible values )
    //all -> return all the todos
    //active -> return only active todos
    //completed -> return only completed todos

    if(filterName === 'all') {
        const todos = await mongoose.model('Todo').find(); //ye find function se hamne sabhi todos ko find kiya hai
        return res.status(200).json(todos); //200 mtlb maksad pura
    }
    const todos = await Todo.find({ status: filterName=="active"?false:true }); //ye find function se hamne todos ko find kiya hai
    //agar filterName active hai to status false hoga 
    //agar filterName completed hai to status true hoga
    res.status(200).json(todos); //200 mtlb maksad pura
});

router.post("/login",async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email:email }).select("+password"); //ye findOne function se hamne user ko find kiya hai
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password); //ye compare function se hamne password ko compare kiya hai

        const token = jwt.sign({ id: user._id,name :user.name, email :user.email }, 'secret', { expiresIn: '1h' , algorithm: "HS256" }); //ye token generate kar raha hai    
        //here we pass three tokens 1 .payload -- here the user basic information
        //here we write secret -- so that it defines pattern so that the user can not create any other key
        //2. secret -- this is the secret key which is used to sign the token
        //3. options -- this is an optional parameter -- 
        //like it will expire in 1 hour
        //the empty is also accpeted

        // res.cookie.token = token; //it will send the cookie 
        // res.status(200).json({ message: "Login successful" });

        res.cookie("token", token, { httpOnly: true,secure:true,domain:"localhost",path:"/",maxAge:24 });


        if(!isMatch){
            throw new Error("Invalid email or password");
        }
        req.status(200).json({ message: "Login successful" });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/clear/completed", async (req, res) => {
    try {
        await Todo.deleteMany({status:true}); //ye deleteMany function se hamne sabhi completed todos ko delete kiya hai
        res.status(200).json({ message: "All completed todos deleted successfully" }); //200 mtlb maksad pura
        //ye message tab aayega jab sabhi completed todos delete ho jayenge
    }
    catch( error) {
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
        //ye message tab aayega jab deleteMany function me koi error aayega
    }
});

router.get("/check",async (req, res) => {
    try{
        const authorization = req.headers.authorization; //ye headers se authorization ko liya hai
        const token = authorization.split(" ")[1]; //ye token ko split karke liya hai
        const decoded = jwt.verify(token, 'secret'); //ye token ko verify kar raha hai
        req.user = decoded; //ye decoded token ko user me daal raha hai
        next(); //ye next function ko call kar raha hai
    }
    catch(error){
        res.status(401).json({ message: "Unauthorized" });
    }
});

router.get("/info", verifyUser, VerifyAdmin, async (req, res) => {
    try{
        let user = await User.find({role:{$ne:"admin"}});
        res.status(200).json({user});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }   
});

router.post("/admin/signup",async(req,res)=>{
    try{
        let {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})



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
router.post('/task/add', async (req,res) => {
    try {
        const { task } = req.body; //ye body se hamne task ko liya hai
        const todo = await mongoose.model('Todo').create({ task }); //ye create function se hamne todo ko create kiya hai
        res.status(201).json(todo); //201 mtlb created successfully
    } catch (error) {
        res.status(500).json({ message: error.message }); //pehli fursat me nikkal
    }
});
router.get("/task/search",async(req,res)=>{
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
