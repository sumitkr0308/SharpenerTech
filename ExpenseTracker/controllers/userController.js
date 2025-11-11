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
        console.log(error)
        res.status(500).json({error:error.message});
    }
}

// login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if (!email || !password) {
         return res.status(400).json({ message: "All fields are required." });
        }
      const existingUser = await user.findOne({ where: { email } });
        
        if (!existingUser) {
         return res.status(404).json({ message: "User not found." });
        }
        
        // password not match
        if (existingUser.password !== password) {
         return res.status(401).json({ message: "Invalid credentials." });
         }  
        
        res.status(200).json({ message: "Login successful", user: existingUser });  
    
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports={
    getSignPage,
    signupUser,
    loginUser
}