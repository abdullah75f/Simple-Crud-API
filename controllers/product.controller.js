require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { errorHandlerFunction } = require("../utils/errorHandlerFunction");
const { authenticateToken } = require("../authenticateTokenMiddleware");

const {
  insertProduct,
  allProducts,
  singleProduct,
} = require("../Database/Products");

const createProduct = errorHandlerFunction(async (req, res) => {
  if (!req.user) {
    return res.status(401).send("User not authenticated");
  }
  const product = [
    req.body.name,
    req.body.quantity,
    req.body.price,
    req.user.user_id,
  ];
  const name = product[0];
  const quantity = product[1];
  const price = product[2];
  const user_id = product[3];

  await insertProduct(name, quantity, price, user_id);
  res.status(201).send("Product created successfully");
});

const getProducts = errorHandlerFunction(async (req, res) => {
  res.rows = await allProducts();
  res.status(200).json(res.rows);
});

const getProduct = errorHandlerFunction(async (req, res) => {
  const { id } = req.params;
  const product = await singleProduct(id);
  res.status(200).json(product);
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
