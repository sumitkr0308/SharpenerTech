const db=require("../utils/db");

// add a new bus

const addNewBus=(req,res)=>{
    const {busNumber, totalSeats, availableSeats}=req.body;
    const insertQuery=`INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?,?,?)`;
    db.execute(insertQuery,[busNumber, totalSeats, availableSeats],(err)=>{
        if(err)
        {
            console.log(err.message);
            
            return res.status(500).send(err.message);
        }
        console.log("Value has been added");
        return res.status(200).send("Buses are added succesfully");
    })

}

// retrieve bus whith >10 available seats
const viewBusWithAvlSeats=(req,res)=>{
    const viewQuery=`SELECT * FROM Buses WHERE availableSeats>10`;

    db.execute(viewQuery,(err,result)=>{
        if(err)
        {
            return res.status(500).send(err.message);
        }
        console.log("Available Seats")
        return res.status(200).json(result);
    })
}

module.exports={
    addNewBus,
    viewBusWithAvlSeats
}