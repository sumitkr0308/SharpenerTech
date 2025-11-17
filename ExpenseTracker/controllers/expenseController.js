const path=require("path");
const Expenses=require("../models/expense");
const User=require("../models/signupUser")

const getExpenseHome=(req,res)=>{

    res.sendFile(path.join(__dirname,"..","view","expense.html"));

}

// get all expense

const getAllExpenses = async (req, res) => {
  console.log("Decoded user:", req.user);
  try {
    const userId=req.user.userId;
    const expenses = await Expenses.findAll({where:{UserId:userId}});
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add Expenses
const addExpense= async (req,res)=>{
    try {
        const {amount,description,category}=req.body;
        const userId=req.user.userId;
        const expense= await Expenses.create({
            amount,
            description,
            category,
            UserId:userId
        });
        const user = await User.findByPk(userId);
        user.totalExpense = (user.totalExpense || 0) + Number(amount);
        await user.save();
        console.log("Expense created:", expense.dataValues);
        res.status(201).json(expense);
        
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
    
};

const editExpense=async(req,res)=>{
   try {
         const {id}=req.params;
        const userId = req.user.userId;
        const {amount,description,category}=req.body;
        const updatedExpense=await Expenses.findOne({where:{id:id,UserId:userId}});
        updatedExpense.description=description;
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
    const userId=req.user.userId;
    await Expenses.destroy({ where: { id: id,UserId:userId } });
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