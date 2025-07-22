const exprss = require('express');  
const app = express();

require('dotenv').config();

connectDb().then(()=>{
    console.log("connected successfully to the database ");
})
app.listen(PORT ,()=>{
    console.log("server is running on port " + PORT);
})