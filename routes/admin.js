const path = require('path');

const express = require('express');

/* Import our product controller */
const adminController = require('../controllers/admin');

/* Calling Router from express.Router() method
router is a pluggable mini-Express app */
const router = express.Router();

/* Adding a Filter '/admin' before all Express routes below
in rootDir/app.js */
/* Registering http://localhost:3005/admin/add-product 
=> Express Router GET request handler */
router.get('/add-product', adminController.getAddProduct);

/* Registering http://localhost:3005/admin/products 
=> Express Router GET request handler */
router.get('/products', adminController.getProducts);

/* Registering http://localhost:3005/admin/add-product
=> Express Router POST request handler */
router.post('/add-product', adminController.postAddProduct);

/* Registering http://localhost:3005/admin/edit-product
=> Express Router GET request handler */
router.get('/edit-product/:productId', adminController.getEditProduct);

/* Registering http://localhost:3005/admin/edit-product => Express Router POST request handler for POSTing edited product attributes to rootDir/data/products.json */
router.post('/edit-product', adminController.postEditProduct);

/* Registering http://localhost:3005/admin/delete-product => Express POST request handler for deleting a specific product from
rootDir/data/products.json */
router.post('/delete-product', adminController.postDeleteProduct);

// Exporting this Express Router to global
module.exports = router;
