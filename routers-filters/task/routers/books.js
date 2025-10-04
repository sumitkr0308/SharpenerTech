const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
  
    res.send(`<h1>Here is the list of books!</h1>`)
      console.log("we got the list of books");
})

router.post("/",(req,res)=>{
    res.send("Book has been added!");
    console.log(" the book data sent in the request");
})

module.exports=router;