const express=require("express");
const cors = require('cors');

const app=express();
const expenseRoutes=require("../ExpenseTracker/routes/expenseRoutes");
const expenseController=require("../ExpenseTracker/controllers/expenseController")

const db=require("../ExpenseTracker/utils/db");
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// models
require("../ExpenseTracker/models/expense");

app.get('/', expenseController.getExpenseHome);

app.use("/api/expenses",expenseRoutes);


db.sync({force:true}).then(()=>{

    app.listen(4000,()=>{
    console.log("Server is running");
})

}).catch((err)=>{
    console.log(err)
});