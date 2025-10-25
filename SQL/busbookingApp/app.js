const express=require("express");
const db=require("../busbookingApp/utils/db")
const userRoutes=require("../busbookingApp/routers/userRoutes");
const busRoutes=require("../busbookingApp/routers/busRoutes")
const bookingRoutes=require("../busbookingApp/routers/bookingRoutes");

const app=express();

// models
require("../busbookingApp/models")
app.use(express.json());



app.use("/users",userRoutes);

app.use("/buses",busRoutes);

app.use("/bookings",bookingRoutes);

db.sync({force:true}).then(()=>{

    app.listen(3000,()=>{
    console.log("Server is running");
})

}).catch((err)=>{
    console.log(err)
});

