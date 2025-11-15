const express=require("express");
const paymentController=require("../controllers/paymentController")

const router = express.Router();

router.post("/create-order", paymentController.createOrderController);
router.get("/payment-status/:orderId", paymentController.getPaymentStatusController);

module.exports=router;
