const express=require("express");
const app=express();
const PORT=3000;

app.use(express.json());

app.get("/welcome/:username",(req,res)=>{
    const name=req.params.username;
    const role=req.query.role;
    res.send(`Welcome ${name}, your role is ${role}`);
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})