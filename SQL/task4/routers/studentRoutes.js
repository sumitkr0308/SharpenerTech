const express=require("express");
const studentsControllers=require("../controllers/studentControllers")

const router=express.Router();

// add entries
router.post("/add",studentsControllers.addStudents);
// update entries
router.put("/update/:id",studentsControllers.updateEntries);
// delete entries
router.delete("/delete/:id",studentsControllers.deleteEntries);

// getstudents
router.get("/",studentsControllers.getstudents);
// getstudents by id
router.get("/:id",studentsControllers.getStudentsById);

module.exports=router;