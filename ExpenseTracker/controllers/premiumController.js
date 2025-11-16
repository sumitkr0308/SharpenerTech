const Expense = require("../models/expense");
const User = require("../models/signupUser");
const { Sequelize } = require("sequelize");

exports.showLeaderboard = async (req, res) => {
  try {
    // Confirm user is premium
    const currentUser = await User.findByPk(req.user.userId);
    if (!currentUser.isPremium) {
      return res.status(403).json({ message: "Access denied: Not a premium user" });
    }

    const leaderboard = await Expense.findAll({
      attributes: [
        "UserId",
        [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"]
      ],
      group: ["UserId"],
      order: [[Sequelize.literal("totalAmount"), "DESC"]],
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ]
    });

    res.json(leaderboard);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
};
