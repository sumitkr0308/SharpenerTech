const express=require('express');
const router=express.Router();
const userControllers=require("../controllers/userControllers")

router.post('/add',userControllers.createUsers);

router.post("/transfer",userControllers.transferMoney);

module.exports=router;