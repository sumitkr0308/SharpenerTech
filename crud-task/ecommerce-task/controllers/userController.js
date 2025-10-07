const getUser=(req,res)=>{
    res.send("Fetching all users");
};
const postuser=(req,res)=>{
    res.send("Adding a new user")
};
const getUserById=(req,res)=>{
    const id=req.params.id;
    res.send(`Fetching user with ID: ${id}`);
};

module.exports={
    getUser,
    getUserById,
    postuser
}