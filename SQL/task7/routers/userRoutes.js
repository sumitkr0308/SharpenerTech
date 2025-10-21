const express=require("express");
const router=express.Router();
const userControllers=require("../controllers/userController")

//add new user
router.post("/",userControllers.addNewUser);

// retrieve all users
router.get("/",userControllers.viewAllUsers);

module.exports=router;