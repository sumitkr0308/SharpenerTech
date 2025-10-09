const express=require("express");
const router=express.Router();
const userControllers=require("../controllers/userController")

router.get("/",userControllers.getUser);

router.post("/",userControllers.postUser);

router.get("/:id",userControllers.getUserById);

module.exports=router;