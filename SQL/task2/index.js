const express= require("express");
const db=require("../task2/utils/db-connection");
const studentsRoutes=require("../task2/routers/studentRoutes")
const app=express();

app.use(express.json());


app.use("/students",studentsRoutes);

app.listen(3000,()=>{
    console.log("server is running");
})