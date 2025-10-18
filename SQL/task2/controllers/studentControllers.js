const db=require("../utils/db-connection");

const addStudents=(req,res)=>{
    const {email,name}=req.body;
    const insertQuery=`INSERT INTO students (email,name) VALUES (?,?)`;

    db.execute(insertQuery,[email,name],(err)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send(err.message);
            db.end();
            return;
           
        }
        console.log("Value has been added");
        res.status(200).send(`Students with name ${name} successfully added`)
    })

}
const updateEntries=(req,res)=>{
    const {id}=req.params;
    const{name}=req.body;
    const updateQuery=`UPDATE students SET name=? WHERE id=?`;
    db.execute(updateQuery,[name,id],(err,result)=>{
        
        if(err)
        {   console.log(err.message);
            return res.status(500).send(err.message);
        }
        if(result.affectedRows===0)
        {
           return res.status(404).send("Students Not Found");
        }

        res.status(200).send("User has been updated");
    })
}

const deleteEntries=(req,res)=>{
    const {id}=req.params;
    const deleteQuery=`DELETE FROM students WHERE id=?`;
    db.execute(deleteQuery,[id],(err,result)=>{
          if(err)
        {   console.log(err.message);
            return  res.status(500).send(err.message);
        }
        if(result.affectedRows===0)
        {
            return res.status(404).send("Students Not Found");
        }

        res.status(200).send("User has been Deleted");
    })
}
module.exports={
    addStudents,
    updateEntries,
    deleteEntries
}