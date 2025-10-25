const express=require("express");
const router=express.Router();
const bookingController =require("../controllers/bookingsController");


router.post("/",bookingController.addBookings);

router.get("/", bookingController.fetchBookings);


module.exports=router;