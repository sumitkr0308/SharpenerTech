const express=require("express");
const router=express.Router();
const cartControllers=require("../controllers/cartController")

router.get("/:userId",cartControllers.getCartById);

router.post("/:userId",cartControllers.postCartById);



module.exports=router;