const express=require("express");
const app=express();
const port=3000;
const userRouter=require("./routers/userRoutes");
const productRouter=require("./routers/productRoutes");
const cartRouter=require("./routers/cartRoutes");

app.use(express.json());
app.get("/",(req,res)=>{
    res.send(`<h1>WELCOME TO E-COMMERCE STARTUP</h1>`);
});

// userRoute
app.use("/users",userRouter);
// productROute
app.use("/products",productRouter);
// cartRoute
app.use("/cart",cartRouter);
// error
app.use((req,res)=>{
    res.status(404).send(`<h1>Error- Page Not Found</h1>`)
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
});