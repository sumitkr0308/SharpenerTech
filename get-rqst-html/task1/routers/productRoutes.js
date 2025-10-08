const express=require("express");
const router=express.Router();
const productController=require("../controllers/productControllers")

router.get("/products",productController.getProduct);

module.exports=router;