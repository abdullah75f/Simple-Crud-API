require("dotenv").config();
const jwt = require("jsonwebtoken");
const products = [];

const createProduct =  (req, res) => {
  try {
    const product = {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    };
    products.push(product);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("There is an Error");
    }
  }


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
const getProducts = async (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("There is server error, check your server");
    }
  }

// const getProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndUpdate(id, req.body);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }
//     const updatedProduct = await Product.findById(id);

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndDelete(id);

//     if (!product) {
//       res.status(404).json("Product not find");
//     }
//     res.status(200).json({
//       message: "Product deleted sucessfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

module.exports = {
  getProducts,
  // getProduct,
  createProduct,
  // updateProduct,
  // deleteProduct,
  authenticateToken,
};
