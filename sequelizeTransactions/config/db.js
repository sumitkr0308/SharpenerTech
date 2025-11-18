const {Sequelize}=require("sequelize");

const sequelize=new Sequelize('transactiontest','root','Sumit@229',{
    host:'localhost',
    dialect:'mysql'
});

const dbConnection=async()=>{
    try {
        await sequelize.authenticate();
        console.log("Database is Connected Succesfully!");
    } catch (error) {
        console.log(`Error:`,error);
    }
};

// start connection
dbConnection();

module.exports=sequelize;