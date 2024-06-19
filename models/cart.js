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
    static addProduct(id, productPrice) {
        /* 1.Fetch the previous cart using fs.readFile() async
        Thus, we ONLY have 1 cart{} at all times */
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            /* If NO errors => Cart already exists */
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            /* 2.Analyze cart => Find a product{} by 
            checking the passed-in 'id' against productId */
            const existingProductIndex = cart.products.findIndex(
                eachProduct => eachProduct.id === id
            );
            console.log(`existingProductIndex:`);
            console.log(existingProductIndex);
            console.log(`\n`);

            const existingProduct = cart.products[existingProductIndex];
            console.log(`existingProduct:`);
            console.log(existingProduct);
            console.log(`\n`);

            let updatedProduct;

            /* If we have an existing product already =>
            spread operator{...} to Shallow Copy */
            if (existingProduct) {
                /* updatedProduct.qty exists cuz 
                existingProduct.qty exists already */
                updatedProduct = { ...existingProduct };
                /* Increase updatedProduct.qty by 1 */
                updatedProduct.qty++;

                /* If existingProduct => replace it by
                i. Shallow Copying existing cart.products[] */
                cart.products = [...cart.products];
                console.log(`Previous cart.products[]:`);
                console.log(cart.products);

                /* ii. Overwriting cart.products[existingProductIndex] with updatedProduct */
                cart.products[existingProductIndex] = updatedProduct;
                console.log(`Having replaced previous cart.products[]\nthrough cart.products[existingProductIndex] = updatedProduct\nPresent cart.products[]:`);
                console.log(cart.products);
                console.log(`\n`);
            } else {
                /* iii. If NO existingProduct in cart{} */
                updatedProduct = { id: id, qty: 1 };

                /* iv. JOIN {},{} using Next-gen spread operator feature [...1st, 2nd as an additional product] */
                cart.products = [...cart.products, updatedProduct];
            }
            /* 3. Add new product => increase cart total price value
            cart { products: [], totalPrice: 0 }
            cart.totalPrice always increases as users add a product{} into cart */
            cart.totalPrice = cart.totalPrice + +productPrice;

            console.log(`Logging cart{} before writing cart{} into rootDir/data/cart.json:`);
            console.log(cart);
            console.log(`\n`);

            /*4. Write new Cart[{}] back to rootDir/models/cart.js 
            after JSON.stringify(cart) before saving to Backend 
            {["productTitle":"productValue",...],"totalPrice"}
            */
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(`Error writing existing cart[{"productKey":"productValue"},"totalPrice"]`);
                console.log(err);
                console.log(`\n`);
            });
        });
    }
}