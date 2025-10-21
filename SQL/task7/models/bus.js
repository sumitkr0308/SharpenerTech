const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Buses = sequelize.define("Buses", {
  busNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Buses;
