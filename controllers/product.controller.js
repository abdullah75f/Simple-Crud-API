require("dotenv").config();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const products = [];

const createProduct = (req, res) => {
  try {
    const product = {
      user_id: req.user.user_id,
      id: uuidv4(),
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    };

    products.push(product);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("There is an Error");
  }
};

const getProducts = async (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("There is server error, check your server");
  }
};

const getProduct = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(
      (product) => product.id.toString() === id.toString()
    );

    if (product) res.status(200).json(product);
    else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("There is server error, check your server");
  }
};

const updateProduct = (req, res) => {
  try {
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
    }
  } catch (error) {
    res.status(500).send("There is server error, check your server");
  }
};

const deleteProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send("There is some server error");
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
