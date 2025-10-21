const db=require("../utils/db-connection");
const Students=require("../models/students");

const addStudents= async (req,res)=>{
    const {email,name}=req.body;
   try {
    const student= await Students.create(
        {
            email:email,
            name:name
        }
    )
    await student.save();
    return res.status(200).send(`User with name ${student.name} is added`);
    
   } catch (error) {

    res.status(500).send("Unable to add"+err.message);
    
   } 
    
   

}
const updateEntries= async (req,res)=>{
    try {

        const {id}=req.params;
        const{name}=req.body;
        const student= await Students.findByPk(id);
        if(!student)
        {   
            return res.status(404).send("Student Not Found");

        }
        // update
        student.name=name;
        await student.save();
        return res.status(200).send("Student is Updated");
        
    } catch (error) {
        return res.status(500).send("Student Can't be updated");
    }
    ;
    
}

const deleteEntries= async (req,res)=>{
    try {
        const {id}=req.params;
        const student=await Students.destroy({
            where:{
                id:id
            }
        })
        if(!student)
            res.status(404).send("Student Not Found");
        
      res.status(200).send("Student Successfully Deleted");  
        
    } catch (error) {
        res.status(500).send("Student Can't be Deleted"+err.message);
    }
    
}
module.exports={
    addStudents,
    updateEntries,
    deleteEntries
}