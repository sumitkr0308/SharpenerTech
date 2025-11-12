const {DataTypes}=require("sequelize");
const sequelize=require("../utils/db");
const User=require("./signupUser");

const expense= sequelize.define('expense',{
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
});


// relationship
User.hasMany(expense);
expense.belongsTo(User);


module.exports=expense;