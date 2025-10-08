const handleSubmit=(e)=>{
    e.preventDefault();
    const product=e.target.productName.value;
    const obj={
        "productName": product
    }
    axios.post("http://localhost:4000"+"/api/products",obj).then((result)=>{
        console.log("Server Response:", result.data.value);
    })
}