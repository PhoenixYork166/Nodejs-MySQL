const path = require('path');

const express = require('express');

/* Import our product controller */
const adminController = require('../controllers/admin');

/* Calling Router from express.Router() method
router is a pluggable mini-Express app */
const router = express.Router();

/* 
We added a Filter in rootDir/app.js
app.use('/admin', adminRoutes);
*/
/* Registering http://localhost:3005/admin/add-product 
=> Express Router GET request handler */
router.get('/add-product', adminController.getAddProduct);

/* Registering http://localhost:3005/admin/products 
=> Express Router GET request handler */
router.get('/products', adminController.getProducts);

/* Registering http://localhost:3005/admin/add-product
=> Express Router POST request handler */
router.post('/add-product', adminController.postAddProduct);

// Exporting this Express Router to global
module.exports = router;

/* Another way of exporting Express Routes
exports.routes = router;
exports.products = products;
*/
