const user=require("../models/signupUser");
const path=require("path");

const getSignPage=(req,res)=>{

    res.sendFile(path.join(__dirname,"..","view","signup.html"));

}

// sign up
const signupUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const signupUsers= await user.create({
            name,
            email,
            password
        })
        res.status(201).json(signupUsers);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


module.exports={
    getSignPage,
    signupUser
}