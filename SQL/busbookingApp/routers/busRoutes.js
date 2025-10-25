const express=require("express");
const router=express.Router();
const busControllers=require("../controllers/busControllers");

// add a new bus
router.post("/",busControllers.addNewBus);
// retrieve bus whith >10 available seats
router.get("/available/:seats",busControllers.viewBusWithAvlSeats);

// retrieve bus with booking
router.get("/:id/bookings",busControllers.viewBusWithBookings);

module.exports=router;