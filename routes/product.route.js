const express = require("express");
const router = express.Router();

const { getProducts,getProduct,createProduct,updateProduct,deleteProduct } = require("../controllers/product.controller");

router.post("/", createProduct);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProducts);
router.post("/", createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;
