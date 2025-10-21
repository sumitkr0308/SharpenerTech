const {Sequelize, DataTypes}=require("sequelize");
const sequelize=require("../utils/db-connection");

const Students=sequelize.define('Students',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allNull:false
        },
        name:{
            type:DataTypes.STRING,
            allNull:false
        },
        email:{
            type:DataTypes.STRING,
            allNull:false
        }
    }
);

module.exports=Students;