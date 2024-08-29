require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { errorHandlerFunction } = require("../utils/errorHandlerFunction");
const { insertProduct } = require("../Database/Products");

const createProduct = errorHandlerFunction(async (req, res) => {
  const product = [
    req.body.name,
    req.body.quantity,
    req.body.price,
    req.selected_user.user_id,
  ];
  const name = product[0];
  console.log(name);
  
  const quantity = product[1];
  const price = product[2];
  const user_id = product[3];

  await insertProduct(name, quantity, price, user_id);
});

const getProducts = errorHandlerFunction(async (req, res) => {
  res.status(200).json(products);
});

const getProduct = errorHandlerFunction(async (req, res) => {
  const { id } = req.params;
  const product = products.find(
    (product) => product.id.toString() === id.toString()
  );

  if (product) res.status(200).json(product);
  else {
    res.status(404).send("Product not found");
  }
});

const updateProduct = errorHandlerFunction(async (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(
    (product) => product.id.toString() === id.toString()
  );

  if (productIndex === -1) {
    return res.status(404).send("Product not found !");
  }
  const product = products[productIndex];
  if (product.user_id.toString() === req.body.user_id.toString()) {
    const updatedProduct = {
      ...product,
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    };
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
  } else {
    res.status(401).send("Unauthorized action");
  }
});

const deleteProduct = errorHandlerFunction(async (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(
    (product) => product.id.toString() === id.toString()
  );
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }
  const product = products[productIndex];
  if (product.user_id.toString() === req.body.user_id.toString()) {
    products.splice(productIndex, 1);
    res.status(200).send("Product deleted sucessfully");
  } else {
    req.status(401).send("Unauthorized user!");
  }
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
