const { sendResponse, sendErrorResponse } = require("../utils/response");

// Mock users data
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Fetch all users
const getUser = async (req, res) => {
  try {
    sendResponse(res, users, 200);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Failed to fetch users" });
  }
};

// Add a new user
const postUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return sendErrorResponse(res, { statusCode: 400, message: "Name and email are required" });
    }

    const newUser = { id: Date.now(), name, email };
    users.push(newUser); // Add to mock data
    sendResponse(res, newUser, 201);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Failed to add user" });
  }
};

// Fetch user by ID
const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
      return sendErrorResponse(res, { statusCode: 404, message: `User with ID ${id} not found` });
    }

    sendResponse(res, user, 200);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Error fetching user by ID" });
  }
};

module.exports = {
  getUser,
  postUser,
  getUserById,
};
