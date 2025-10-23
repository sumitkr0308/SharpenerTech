const {Sequelize, DataTypes}=require("sequelize");
const sequelize=require("../utils/db-connection");

const IdentityCard=sequelize.define('identitycard',{
    id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allNull:true
        },
    cardNo:{
        type : DataTypes.INTEGER,
        unique:true,
        allowNull:false
    }    
})

module.exports=IdentityCard;