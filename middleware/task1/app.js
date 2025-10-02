const express=require("express");
const app=express();
const port=3000;

// custom middleware;
// function user(req,res,next){
//     req.user="Guest";
//     next();
// }

app.use("/welcome",(req,res,next)=>{
    req.user="Guest";
    next();
})

app.get("/welcome",(req,res)=>{
    res.send(`<h1>Welcome, ${req.user}</h1>`);
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})