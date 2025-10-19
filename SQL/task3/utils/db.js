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
create table IF NOT EXISTS Users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS Buses(
 id INT AUTO_INCREMENT PRIMARY KEY,
 busNumber INT, 
 totalSeats INT,
  availableSeats INT
);
CREATE TABLE IF NOT EXISTS Bookings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    seatNumber INT
);
CREATE TABLE IF NOT EXISTS Payments(
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

const insertSampleData = `
    INSERT INTO Users (name, email) VALUES
      ('Sumit Kumar', 'sumit@example.com'),
      ('Aditi Sharma', 'aditi@example.com'),
      ('Rohan Patel', 'rohan@example.com'),
      ('Priya Verma', 'priya@example.com');

    INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES
      (101, 40, 15),
      (102, 50, 8),
      (103, 45, 22),
      (104, 60, 30),
      (105, 35, 12);

    INSERT INTO Bookings (seatNumber) VALUES
      (5),
      (10),
      (12),
      (8),
      (18);

    INSERT INTO Payments (amountPaid, paymentStatus) VALUES
      (1500, 'Paid'),
      (2000, 'Pending'),
      (1200, 'Paid'),
      (1000, 'Paid'),
      (1800, 'Pending');
    `;

    dbConnection.query(insertSampleData, (err) => {
      if (err) {
        console.log("❌ Error inserting sample data:", err);
        return;
      }
      console.log("✅ Sample data inserted successfully!");
    });
  });






module.exports= dbConnection;