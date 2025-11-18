const {DataTypes}=require('sequelize');
const sequelize=require("../config/db");

const Users= sequelize.define('Users',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    balance:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports=Users;