const express=require("express");
const router=express.Router();
const userControllers=require('../controllers/userController')

router.get("/",userControllers.getSignPage);

router.post("/",userControllers.signupUser);

module.exports=router;