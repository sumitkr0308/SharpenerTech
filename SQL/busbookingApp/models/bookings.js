const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Bookings = sequelize.define("Bookings", {
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Bookings;
