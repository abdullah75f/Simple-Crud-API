require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { errorHandlerFunction } = require("../utils/errorHandlerFunction");
const { authenticateToken } = require("../authenticateTokenMiddleware");

const {
  insertProduct,
  allProducts,
  singleProduct,
  updateSingleProduct,
  deleteSingleProduct,
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
  const Products = await allProducts();
  res.status(200).json(Products);
});

const getProduct = errorHandlerFunction(async (req, res) => {
  const { id } = req.params;
  const product = await singleProduct(id);
  res.status(200).json(product);
});

const updateProduct = errorHandlerFunction(async (req, res) => {
  const { id } = req.params;
  const updatedFields = [req.body.name, req.body.quantity, req.body.price];
  const product = await updateSingleProduct(id, updatedFields);

  if (
    product &&
    product[0].user_id &&
    req.body.user_id &&
    product[0].user_id.toString() === req.body.user_id.toString()
  ) {
    res.status(200).json(product);
  } else {
    res.status(401).send("Unauthorized action");
  }
});

const deleteProduct = errorHandlerFunction(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteSingleProduct(id);
  res.status(200).send(deletedProduct);
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
