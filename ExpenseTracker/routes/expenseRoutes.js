const express=require("express");
const router=express.Router();
const expenseController=require("../controllers/expenseController");


// fetch all expense
router.get("/",expenseController.getAllExpenses);

// add expense
router.post('/',expenseController.addExpense);

// edit
router.put('/:id',expenseController.editExpense);

// delete
router.delete("/:id",expenseController.deleteExpense);

module.exports=router;