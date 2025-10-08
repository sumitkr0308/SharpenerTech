const path=require("path");

const getProduct=(req,res)=>{

    res.sendFile(path.join(__dirname,"..","view","productView.html"));

}

const addProduct=(req,res)=>
{
    const data=req.body;
    res.json({value:data.productName});
}

module.exports={
    getProduct,
    addProduct
}