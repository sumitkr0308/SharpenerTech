const express=require("express");
const courseControllers=require("../controllers/courseControllers")

const router=express.Router();

router.post('/addcourses',courseControllers.addCourses);
router.get('/addStudentCourses',courseControllers.addStudentsToCourses);

module.exports=router;