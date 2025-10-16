const express= require("express");
// import mysql
const mysql=require("mysql2");
const app=express();

// create connection
const connection=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:'Sumit@229',
        database:'testdb'
    }
);

// connect the db
connection.connect((err)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("Server is connected to MYSQL")
    // interacting with db
    const creationQuery=`create table Students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(30)
    )`


    // EXECUTE QUERY
    connection.execute(creationQuery,(err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log("New Table is Executed");
    })
})
app.use("/",(req,res)=>{
    res.send("Lets Connect this server to SQL DB");
})


app.listen(3000,()=>{
    console.log("server is running");
})