const express=require("express");
const db=require("../task3/utils/db")
const userRoutes=require("../task3/routers/userRoutes");
const busRoutes=require("../task3/routers/busRoutes")

const app=express();

app.use(express.json());


// app.use("/",(req,res)=>{
//     res.send(`<h1>Welcome to Bus Booking System DB Task</h1>`);
// })

app.use("/users",userRoutes);

app.use("/buses",busRoutes);


app.listen(3000,()=>{
    console.log("Server is running");
})