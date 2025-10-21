const Users=require("../models/user");

// add a new user
const addNewUser=async (req,res)=>{
   try {
        const {name,email}=req.body;
         if (!name || !email) {
            return res.status(400).send("Name and email are required");
            }
        const user=await Users.create({
            name:name,
            email:email
        })

        res.status(200).send(`User with name ${user.name} is added`);

    
   } catch (error) {

    res.status(500).send(`User can't be added`);
    
   }
    
    

}

// retrieve all users
const viewAllUsers=async (req,res)=>{
    try {
    const user = await Users.findAll();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports={
    addNewUser,
    viewAllUsers
}