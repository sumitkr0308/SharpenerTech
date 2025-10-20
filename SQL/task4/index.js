const express= require("express");
const db=require("../task4/utils/db-connection");
const studentsRoutes=require("../task4/routers/studentRoutes")
const app=express();

app.use(express.json());


app.use("/students",studentsRoutes);

app.listen(3000,()=>{
    console.log("server is running");
})