const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Users = sequelize.define("Users", {
  id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
  },  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Users;
