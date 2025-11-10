const express=require("express");
const cors = require('cors');

const app=express();
const expenseRoutes=require("./routes/expenseRoutes");
const expenseController=require("./controllers/expenseController")
const userRoutes=require('./routes/userRoutes');
const userControllers=require('./controllers/userController');

const db=require("./utils/db");
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// models
require("./models/expense");
require("./models/signupUser")

app.get('/', expenseController.getExpenseHome);
app.use('/signup',userRoutes)

app.use("/api/expenses",expenseRoutes);


db.sync({force:true}).then(()=>{

    app.listen(4000,()=>{
    console.log("Server is running");
})

}).catch((err)=>{
    console.log(err)
});