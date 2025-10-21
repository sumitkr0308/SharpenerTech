const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Payments = sequelize.define("Payments", {
  amountPaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Payments;
