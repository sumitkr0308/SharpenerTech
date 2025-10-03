const express=require("express");
const app=express();
const PORT=4000;
const productRouter=require("./routers/products");
const categoriesRouter=require("./routers/categories")

app.use(express.json());

// Middleware for logging requests
app.use((req,res,next)=>{
    console.log(`${req.method} request made to ${req.url}`);
    next();
})

app.use("/products",productRouter)


app.use("/categories",categoriesRouter);

// unknown routes 
app.use((req,res)=>{
    res.status(404).send(`<h1>404 - Page Not Found</h1>`);
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})