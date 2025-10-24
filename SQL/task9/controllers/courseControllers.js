const Courses =require("../models/courses");
const Students =require("../models/students");
const addCourses= async (req,res)=>{
    try {
        const {name}=req.body;

        const course=await Courses.create({'name':name});
        res.status(201).json(course);

        
    } catch (error) {
        res.status(500).json({'error':error.message})
    }
};

const addStudentsToCourses= async (req,res)=>{
    try {
        const {studentId,courseIds}=req.body;
        const student=await Students.findByPk(studentId);
        if (!student) {
      return res.status(404).json({ message: `Student with ID ${studentId} not found` });
    }
        const courses =await Courses.findAll({
            where:{
                id:courseIds
            }
        })
        await student.addCourses(courses);
        const updatedStudents= await Students.findByPk(studentId,{include:Courses});
        res.status(200).json(updatedStudents);
        
    } catch (error) {
        res.status(500).json({'error':error.message})
    }
}

module.exports={
    addCourses,
    addStudentsToCourses
}