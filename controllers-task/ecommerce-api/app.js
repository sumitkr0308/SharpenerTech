const express=require("express");
const app=express();
const port=3000;
const productRouter=require("./routers/productRoutes")

app.use(express.json());
app.get("/",(req,res)=>{
    res.send(`<h1>WELCOME TO CONTOLLERS TASK</h1>`);
});


// productRoutes
app.use("/products",productRouter);

// error
app.use((req,res)=>{
    res.status(404).send(`<h1>Error- Page Not Found</h1>`)
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
});