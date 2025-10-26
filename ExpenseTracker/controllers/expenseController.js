const path=require("path");
const Expenses=require("../models/expense");

const getExpenseHome=(req,res)=>{

    res.sendFile(path.join(__dirname,"..","view","expense.html"));

}

// get all expense

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add Expenses
const addExpense= async (req,res)=>{
    try {
        const {name,amount,category}=req.body;
        const expense= await Expenses.create({
            name,
            amount,
            category
        });

        res.status(201).json(expense);
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
    
};

const editExpense=async(req,res)=>{
   try {
         const {id}=req.params;
        const {name,amount,category}=req.body;
        const updatedExpense=await Expenses.findByPk(id);
        updatedExpense.name=name;
        updatedExpense.amount=amount;
        updatedExpense.category=category;
        
        await updatedExpense.save();

        res.status(200).json(updatedExpense);
    
   } catch (error) {
    res.status(500).json({ message: "Error updating expense", error: error.message });
   }


};

const deleteExpense=async(req,res)=>{
   try {

    const {id}=req.params;
    await Expenses.destroy({ where: { id: id } });
    res.status(200).json({ message: 'Expense deleted' });
    
   } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
   }
    

}

module.exports={
    getExpenseHome,
    getAllExpenses,
    addExpense,
    editExpense,
    deleteExpense

}