const db=require("../utils/db");

// add a new user
const addNewUser=(req,res)=>{
    const {name,email}=req.body;
    const insertQuery=`INSERT INTO users (name,email) VALUES (?,?)`;
    db.execute(insertQuery,[name,email],(err)=>{
        if(err)
        {
            console.log(err.message);
            
            return res.status(500).send(err.message);
        }
        console.log("Value has been added");
        return res.status(200).send("Users are added succesfully");
    })

}

// retrieve all users
const viewAllUsers=(req,res)=>{
    const viewQuery=`SELECT * FROM Users`;
    db.execute(viewQuery,(err,result)=>{
        if(err)
        {
            return res.status(500).send(err.message);
        }
        return res.status(200).send(result);
    })
}
module.exports={
    addNewUser,
    viewAllUsers
}