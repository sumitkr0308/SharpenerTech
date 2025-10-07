const productServices=require("../services/productServices");

const getProduct=(req,res)=>{
    const products=productServices.getAllProduct();
    res.json(products);
}
const getProductById=(req,res)=>{
    const id=req.params.id;
    const product=productServices.getOneProductById(id);

    if(product)
        res.json(product);
    
}

const postProduct=(req,res)=>{
    const newProduct=req.body;
    const createdProduct=productServices.addProduct(newProduct);

    res.json(createdProduct);
};

module.exports={
    getProduct,
    getProductById,
    postProduct
}