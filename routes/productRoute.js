const express = require("express");
const Product = require("../models/productModel")
const { getProducts, findProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productController")

const router = express.Router();

router.get("/", getProducts)

router.get("/:id", findProduct)

router.put("/:id", updateProduct)

router.post("/", createProduct)

router.delete("/:id", deleteProduct)

module.exports = router;