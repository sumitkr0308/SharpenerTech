const { sendResponse, sendErrorResponse } = require("../utils/response");

// Mock cart data
let carts = [
  {
    userId: 1,
    items: [
      { productId: 1, name: "Laptop", quantity: 1, price: 50000 },
      { productId: 2, name: "Phone", quantity: 2, price: 25000 },
    ],
  },
  {
    userId: 2,
    items: [
      { productId: 3, name: "Headphones", quantity: 1, price: 3000 },
    ],
  },
];

// ✅ Fetch cart by user ID
const getCartById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const cart = carts.find((c) => c.userId === userId);

    if (!cart) {
      return sendErrorResponse(res, { statusCode: 404, message: `Cart for user ID ${userId} not found` });
    }

    sendResponse(res, cart, 200);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Failed to fetch cart" });
  }
};

// ✅ Add product to cart by user ID
const postCartById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { productId, name, price, quantity } = req.body;

    if (!productId || !quantity || !name || !price) {
      return sendErrorResponse(res, { statusCode: 400, message: "Product ID, name, price, and quantity are required" });
    }

    let cart = carts.find((c) => c.userId === userId);

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = { userId, items: [] };
      carts.push(cart);
    }

    const newItem = { productId, name, price, quantity };
    cart.items.push(newItem);

    sendResponse(res, newItem, 201);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Failed to add product to cart" });
  }
};

module.exports = {
  getCartById,
  postCartById,
};
