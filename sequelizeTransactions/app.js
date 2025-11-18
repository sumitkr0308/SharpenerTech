const express=require("express");
const cors=require("cors");
const app=express();

const db=require("./config/db");
const userRoutes=require("./routes/userRoutes")

app.use(cors());
app.use(express.json());

// db
require("./model/User")
// routes
app.use("/api/user",userRoutes);

db.sync({force:true})
    .then(()=>{
        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
        })
    })
    .catch((err)=>console.log(err));

