const { sendResponse, sendErrorResponse } = require("../utils/response");

// product data
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 25000 },
];

// ✅ Fetch all products
const getProduct = async (req, res) => {
  try {
    sendResponse(res, products, 200);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Failed to fetch products" });
  }
};

// ✅ Add a new product
const postProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return sendErrorResponse(res, { statusCode: 400, message: "Name and price are required" });
    }

    const newProduct = { id: Date.now(), name, price };
    products.push(newProduct); // Add to product data

    sendResponse(res, newProduct, 201);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Failed to add product" });
  }
};

// ✅ Fetch product by ID
const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return sendErrorResponse(res, { statusCode: 404, message: `Product with ID ${id} not found` });
    }

    sendResponse(res, product, 200);
  } catch (err) {
    sendErrorResponse(res, { statusCode: 500, message: "Error fetching product by ID" });
  }
};

module.exports = {
  getProduct,
  postProduct,
  getProductById,
};
