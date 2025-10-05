const express=require("express");
const app=express();
const PORT=3000;

const studentRouter=require("./routers/student");
const courseRouter=require("./routers/course")


app.use(express.json());
// homeroutes
app.get("/",(req,res)=>{
    res.send(`Welcome to the Student & Course Portal API!`);
})

// studentRoutes
app.use("/students",studentRouter);

// courseRoutes
app.use("/courses",courseRouter);



// for error
app.use((req,res)=>{
    res.status(404).send(`<h1>Page Not Found</h1>`)
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})