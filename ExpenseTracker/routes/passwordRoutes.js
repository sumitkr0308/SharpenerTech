const express=require("express");
const passwordControllers=require("../controllers/passwordControllers");
const router=express.Router();

router.post('/forgotpassword',passwordControllers.forgotPassword);

module.exports=router;