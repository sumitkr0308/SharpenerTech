const express=require("express");
const app=express();
const PORT=3000;
const booksRouter=require("./routers/books");


app.use(express.json());

app.use("/books",booksRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http//:localhost:${PORT}`)
})

