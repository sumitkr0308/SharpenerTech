const { Op } = require("sequelize");
const Buses=require("../models/bus");

// add a new bus

const addNewBus= async (req,res)=>{
    try {
        const {busNumber, totalSeats, availableSeats}=req.body;
        await Buses.create(
            {
                busNumber:busNumber,
                totalSeats:totalSeats,
                availableSeats:availableSeats
            }    
        )
        res.status(200).send("Bus added Successfully");

    } catch (error) {

        res.status(500).send("Bus Can't be added");     
    }

};

// retrieve bus whith >10 available seats
const viewBusWithAvlSeats=async (req,res)=>{
  
  try {
     const minSeats=parseInt(req.params.seats);
     const bus= await Buses.findAll({
                    where:{
                        availableSeats: {[Op.gt]:minSeats}
                            }
                        });
    if (!bus.length) {
      return res.status(404).send("No buses found with available seats greater than " + minSeats);
    }                    
   res.status(200).json(bus);
    
  } catch (error) {

    res.status(500).send("Bus Can't be searched");     
  } 
};

module.exports={
    addNewBus,
    viewBusWithAvlSeats
}