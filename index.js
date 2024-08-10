// brain of the backend
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/product.model.js");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Update a product 

app.put('api/product/:id', async(req,res)=>{
    try{
        const {id} =req.params;

        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

}

catch(error){

}


})

mongoose
  .connect(
    "mongodb+srv://abdullah75farid:8EaSXlcvGskghVlJ@backenddb.cwpro.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed!");
  });
