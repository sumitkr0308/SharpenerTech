// controllers/paymentController.js
const Payment=require("../models/payment.js")
const { createOrder, getPaymentStatus } =require("../services/cashfreeServices.js");

// =========================================
// 1️⃣ CREATE ORDER (Backend → Cashfree → Frontend)
// =========================================
const createOrderController = async (req, res) => {
  try {
    const { amount, customerId, customerPhone } = req.body;

    // Validation
    if (!amount || !customerId || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: "amount, customerId and customerPhone are required",
      });
    }

    const orderId = "ORDER_" + Date.now();

    // Call Cashfree
    const paymentSessionId = await createOrder(
      orderId,
      amount,
      "INR",
      customerId,
      customerPhone
    );

    if (!paymentSessionId) {
      return res.status(500).json({
        success: false,
        message: "Failed to create Cashfree order",
      });
    }

    // Save order to DB
    await Payment.create({
      orderId,
      paymentSessionId,
      amount,
      currency: "INR",
      customerId,
      customerPhone,
      status: "PENDING",
    });

    return res.status(200).json({
      success: true,
      orderId,
      paymentSessionId,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =========================================
// 2️⃣ GET PAYMENT STATUS (Backend → Cashfree → DB)
// =========================================
 const getPaymentStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // Fetch payment status from Cashfree
    const result = await getPaymentStatus(orderId);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Unable to fetch payment status",
      });
    }

    const { status, payments } = result;

    // Update DB status
    await Payment.update(
      {
        status,
        transactions: payments,
      },
      {
        where: { orderId },
      }
    );

    return res.status(200).json({
      success: true,
      orderId,
      status,
      transactions: payments,
    });
  } catch (error) {
    console.error("Payment Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error retrieving payment status",
    });
  }
};

module.exports={
    createOrderController,
    getPaymentStatusController
}
