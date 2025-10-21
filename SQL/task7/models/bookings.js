const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Bookings = sequelize.define("Bookings", {
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Bookings;
