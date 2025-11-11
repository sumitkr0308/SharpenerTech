const express = require("express");
const cors = require('cors');
const app = express();

const db = require("./utils/db");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require('./routes/userRoutes');
const expenseController = require("./controllers/expenseController");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Models
require("./models/expense");
require("./models/signupUser");

// Routes
app.get('/', expenseController.getExpenseHome);
app.use('/signup', userRoutes);
app.use("/api/expenses", expenseRoutes);

// Sync database
db.sync({ alter: true })
  .then(() => {
    app.listen(4000, () => console.log("🚀 Server running on port 4000"));
  })
  .catch(err => console.error("❌ Database error:", err));
