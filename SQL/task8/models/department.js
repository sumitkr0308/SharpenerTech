const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Departments = sequelize.define("Departments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Departments;
