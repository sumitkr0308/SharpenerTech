const db=require("../utils/db-connection");

// getstudents
const getstudents=(req,res)=>{
    const viewQuery=`SELECT * FROM Students`;
    db.execute(viewQuery,(err,result)=>{
        if(err)
        {
            console.log(err.message);
            return res.status(500).send(err.message);
        }
        return res.status(200).json(result);
    })
};
// getStudentsByID
const getStudentsById=(req,res)=>{
    const {id}=req.params;
    const viewQuery=`SELECT *FROM Students WHERE id=?`;
    db.execute(viewQuery,[id],(err,result)=>{
        if(err)
        {
            console.log(err.message);
             return res.status(500).send(err.message);
        }

        return  res.status(200).json(result);
    })
}

const addStudents=(req,res)=>{
    const {email,name,age}=req.body;
    const insertQuery=`INSERT INTO students (email,name,age) VALUES (?,?,?)`;

    db.execute(insertQuery,[email,name,age],(err)=>{
        if(err)
        {
            console.log(err.message);
            return res.status(500).send(err.message);;
           
        }
        console.log("Value has been added");
        res.status(200).send(`Students with name ${name} successfully added`)
    })

}
const updateEntries=(req,res)=>{
    const {id}=req.params;
    const{name,email}=req.body;
    const updateQuery=`UPDATE students SET name=?,email=? WHERE id=?`;
    db.execute(updateQuery,[name,email,id],(err,result)=>{
        
        if(err)
        {   console.log(err.message);
            return res.status(500).send(err.message);
        }
        if(result.affectedRows===0)
        {
           return res.status(404).send("Students Not Found");
        }

        res.status(200).send(`Student ID ${id} successfully updated.`);
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

        res.status(200).send(`Student ID ${id} successfully deleted.`);
    })
}
module.exports={
    addStudents,
    updateEntries,
    deleteEntries,
    getstudents,
    getStudentsById

}