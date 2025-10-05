const express=require("express");
const router=express.Router();

const courses = [

{ id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },

{ id: 2, name: "Backend", description: "Node.js, Express, MongoDB" }

];

router.get("/",(req,res)=>{
    const courseNames = courses.map(course => course.name).join(", ");
    res.send(`Courses: ${courseNames}`);

})

router.get("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if(course)
    {   
        res.send(`Course: ${course.name}, Description: ${course.description}`);
        

    } 
    else
    {
        res.send(`Course not found`);
    }
})

module.exports=router;
