require("dotenv").config();
const jwt = require("jsonwebtoken");
const products = [];

const createProduct = (req, res) => {
  try {
    const product = {
      id: products.length,
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
    const id = req.body.id;
    const product = products.find(
      (product) => parseInt(product.id) === parseInt(id)
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
    const id = req.body.id;
    const productIndex = products.findIndex(
      (product) => parseInt(product.id) === parseInt(id)
    );

    if (productIndex === -1) {
      return res.status(404).send("Product not found !");
    }

    const updatedProduct = {
      id: id,
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    };

    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send("There is server error, check your server");
  }
};
function authenticateToken(req, res, next) {
  const authenticationHeader = req.headers["authorization"];
  const token = authenticationHeader && authenticationHeader.split(" ")[1];

  if (token === null)
    return res.send(
      "You dont have a valid authentication, please authenticate your self"
    );

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.send("Token error");
    req.user = user;
    next();
  });
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.body.id;

    const productIndex = products.findIndex(
      (product) => parseInt(product.id) === parseInt(id)
    );
    if (productIndex === -1) {
      res.status(404).send("Product not found");
    } else {
      products.splice(productIndex, 1);
    }
    res.status(200).send("Product deleted sucessfully");
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
  authenticateToken,
};
