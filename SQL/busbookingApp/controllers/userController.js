const { Users, Bookings, Bus } = require("../models");

// add a new user
const addNewUser=async (req,res)=>{
   try {
        const {name,email}=req.body;
         if (!name || !email) {
            return res.status(400).send("Name and email are required");
            }
        const user=await Users.create({
            name:name,
            email:email
        })

        res.status(200).send(`User with name ${user.name} is added`);

    
   } catch (error) {

    res.status(500).send(`User can't be added`);
    
   }
    
    

}

// retrieve all users
const viewAllUsers=async (req,res)=>{
    try {
    const user = await Users.findAll();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// add User with bookings
const ViewUserWithBookings=async(req,res)=>{
  try {
      const booking=await Bookings.findAll({
        where:{
          userId:req.params.id
        },

          include:[{model:Bus,attributes:["busNumber"]}]
        
      });
      res.status(200).json(booking);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports={
    addNewUser,
    viewAllUsers,
    ViewUserWithBookings
}