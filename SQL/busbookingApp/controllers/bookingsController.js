const Bookings=require("../models/bookings");

// create a new bookings
const addBookings= async (req,res)=>{
   try {
    
   
    const booking=await Bookings.create(req.body);

    res.status(201).json(booking);
   } catch (error) {
    res.status(500).json({ message: error.message });
    
   }
   
}
const fetchBookings= async (req, res) => {
  const bookings = await Bookings.findAll();
  res.json(bookings);
}

module.exports=
{
    addBookings,
    fetchBookings
}