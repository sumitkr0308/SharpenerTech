const express= require("express");
const db=require("../task9/utils/db-connection");
const studentsRoutes=require("../task9/routers/studentRoutes");
const courseRoutes=require("../task9/routers/courseRoutes")
const app=express();

// models
require("../task9/models");

app.use(express.json());


app.use("/students",studentsRoutes);
app.use("/courses",courseRoutes);

db.sync({force:true}).then(()=>{
    app.listen(3000,()=>{
    console.log("server is running");
})

}).catch((err)=>{
    console.log(err);
});

