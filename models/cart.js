const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

/* This Express built-in process.mainModule.filename has deprecated*/
/* Global p for access by any Cart.method() */
const p = path.join(
  rootDir,
  'data',
  'cart.json'
);

module.exports = class Cart {
    static addProduct(id) {
        //1.Fetch the previous cart 
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            /* If NO errors => we know we have an existing Cart */
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //2.Analyze cart => Find existing product{} via productId
            const existingProduct = cart.products.find(eachProduct => eachProduct.id === id);

            let updatedProduct;
            /* 
            If we have an existing product already =>
            Shallow copy existingProduct using spread operator{...}
            */
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                /* Increase updatedProduct.qty by 1 */
                updatedProduct.qty += 1;
            } else {
                /* 124. Adding a Cart Model 05:50 */
            }
        });
        // 3. Add new product / increase quantity
    }
}