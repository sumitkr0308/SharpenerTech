// import mysql
const mysql=require("mysql2");




// create connection
const connection=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:'Sumit@229',
        database:'studentdb'
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
    const creationQuery=`CREATE TABLE IF NOT EXISTS Students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    age INT
    )`


    // EXECUTE QUERY
    connection.execute(creationQuery,(err)=>{
        if(err){
            console.log(err);
            connection.end();
            return;
        }
        console.log("Student Table is Executed");
    })
})

module.exports=connection;