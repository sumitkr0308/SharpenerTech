// import mysql
const mysql=require("mysql2");




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
    const creationQuery=`create table IF NOT EXISTS Students(
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

module.exports=connection;