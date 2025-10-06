const express=require("express");
const router=express.Router();
const productControllers=require("../controllers/productController");

// getrqst
router.get("/",productControllers.getProduct);

// getrqst with id
router.get("/:id",productControllers.getProductById);

// postrqst
router.post("/",productControllers.postProduct);


module.exports=router;

