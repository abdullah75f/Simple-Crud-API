const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const {
    getProducts
} = require('../controllers/product.controller');


router.get('/',getProducts );
router.get('/:id',getProducts)
