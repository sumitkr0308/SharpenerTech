const path=require("path");

const getProduct=(req,res)=>{

    res.sendFile(path.join(__dirname,"..","view","productView.html"));

}

module.exports={
    getProduct
}