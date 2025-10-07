// Simulated product data
let products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Smartphone", price: 30000 },
  { id: 3, name: "Headphones", price: 2000 },
];


const getAllProduct=()=>{
    console.log("Fetching all products");
    return products;
}

const getOneProductById=(id)=>{
    console.log(`Fetching product with ID: ${id}`);
    const product=products.find((p)=>p.id===parseInt(id));
    return product || null;
}


const addProduct=(newProduct)=>{
    console.log("Adding a new product...");
    const product = { id: products.length + 1, ...newProduct };
    products.push(product);
    return product;
};

module.exports = {
  getAllProduct,
  getOneProductById,
  addProduct,
};
