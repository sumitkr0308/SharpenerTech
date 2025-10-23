const express= require("express");
const db=require("../task8/utils/db-connection");
const studentsRoutes=require("../task8/routers/studentRoutes");
const app=express();

// models
require("../task8/models");

app.use(express.json());


app.use("/students",studentsRoutes);

db.sync({force:true}).then(()=>{
    app.listen(3000,()=>{
    console.log("server is running");
})

}).catch((err)=>{
    console.log(err);
});

