const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  authenticateToken,
} = require("../controllers/product.controller");

router.post("/", authenticateToken, createProduct);
router.get("/", authenticateToken, getProducts);
router.get("/:id", authenticateToken, getProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

module.exports = router;
