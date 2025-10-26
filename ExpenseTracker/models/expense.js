const {DataTypes}=require("sequelize");
const sequelize=require("../utils/db");

const expense= sequelize.define('expense',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports=expense;