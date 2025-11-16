const express=require("express");
const router=express.Router();
const userControllers=require('../controllers/userController')
const authenticate = require("../middleware/auth");

router.get("/",userControllers.getSignPage);
router.post("/login", userControllers.loginUser);
router.post("/signup", userControllers.signupUser);
router.get("/status",authenticate,userControllers.checkStatus);

module.exports=router;