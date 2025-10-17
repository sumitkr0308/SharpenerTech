const express=require("express");
const app=express();
const mysql=require("mysql2");

const dbConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sumit@229",
    database:"busdb",
    multipleStatements: true
})

dbConnection.connect((err)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("SQL database connected");

    const createQueries=`
create table Users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);
CREATE TABLE Buses(
 id INT AUTO_INCREMENT PRIMARY KEY,
 busNumber INT, 
 totalSeats INT,
  availableSeats INT
);
CREATE TABLE Bookings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    seatNumber INT
);
CREATE TABLE Payments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    amountPaid INT, 
    paymentStatus VARCHAR(30)
);
`
dbConnection.query(createQueries,(err)=>{
    if(err)
        console.log(err);
   console.log("Tables are created successfully!") 
})
})


app.use("/",(req,res)=>{
    res.send(`<h1>Welcome to Bus Booking System DB Task</h1>`);
})

app.listen(3000,()=>{
    console.log("Server is running");
})