const express= require("express");
const db=require("../task5/utils/db-connection");
const studentsRoutes=require("../task5/routers/studentRoutes");
const app=express();

// models
const StudentsModel=require("../task5/models/students");

app.use(express.json());


app.use("/students",studentsRoutes);

db.sync({force:true}).then(()=>{
    app.listen(3000,()=>{
    console.log("server is running");
})

}).catch((err)=>{
    console.log(err);
});

