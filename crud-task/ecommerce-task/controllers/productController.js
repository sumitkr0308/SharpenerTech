const getProduct=(req,res)=>{
    res.send("Fetching all products");
};

const postProduct=(req,res)=>{
    res.send("Adding a new product");
};

const getProductById=(req,res)=>{
    const id=req.params.id;
    res.send(`Fetching user with ID: ${id}`);
};

module.exports={
    getProduct,
    postProduct,
    getProductById
}