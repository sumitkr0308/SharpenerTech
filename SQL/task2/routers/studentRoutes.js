const express=require("express");
const studentsControllers=require("../controllers/studentControllers")

const router=express.Router();

// add entries
router.post("/add",studentsControllers.addStudents);
// update entries
router.put("/update/:id",studentsControllers.updateEntries);
// delete entries
router.delete("/delete/:id",studentsControllers.deleteEntries);

module.exports=router;