const Users=require("../model/User");
const sequelize=require("../config/db");
const { send } = require("process");

// create users
const createUsers=async(req,res)=>{
    try {
            const {name,balance}=req.body;
            if(!name || !balance)
            {
                throw new Error("Something is missing");
            }
            const user=await Users.create({
                name,balance
            });
            res.status(201).json("User is added", user);

    } catch (error) {
        console.log(error);
        res.status(500).json(Error);
    }
};

// transfer money



const transferMoney=async(req,res)=>{
    // using sequelize transaction
    const transaction=await sequelize.transaction();
    try {
        const {senderId,receiverId,amount}=req.body;
        const sender=await Users.findByPk(senderId,{transaction});
        const receiver=await Users.findByPk(receiverId,{transaction});

        if(!receiver || !sender)
        {
            throw new Error("User is not existed");
        }
        if(sender.balance<amount)
        {
            throw new Error("Insufficient Balance");
        }

        sender.balance-=amount;
        await sender.save({transaction});
        
        // Pseudo Crash
        // if(Math.random()!=0.5)
        // {
        //     throw new Error("Crashed");
        // };

        receiver.balance+=amount;
        await receiver.save({transaction});
       
        console.log("Transaction is Successful");
        await transaction.commit();
        res.status(201).json("Success");

    } catch (error) {
        await transaction.rollback();
        res.status(500).json(error)
    }
    
};

module.exports={
    createUsers,
    transferMoney
}