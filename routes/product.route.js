const express = require("express");
const router = express.Router();

const { getProducts,getProduct,createProduct,updateProduct,deleteProduct, authenticateToken } = require("../controllers/product.controller");

router.post("/",authenticateToken, createProduct);
// router.get("/", getProducts);
// router.get("/:id", getProducts);

// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);


module.exports = router;
