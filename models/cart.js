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
        /* 1.Fetch the previous cart from rootDir/data/cart.json using fs.readFile() async
        Thus, we ONLY have 1 cart{} at all times */
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            /* If NO errors => Cart already exists */
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            /* 2.Analyze cart => match passed in id against each product in cart.products[]
            Extract the matched product index for mapping */
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
            Shallow Copy to another object using 
            spread operator {...} */
            if (existingProduct) {
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

    static deleteProduct(id, productPrice) {
        /* i.Fetch the previous cart from rootDir/data/cart.json using fs.readFile() async
        Thus, we ONLY have 1 cart{} at all times */
        fs.readFile(p, (err, fileContent) => {
            /* ii. When a cart{"products":[{"id":"productId","qty":productQty}],"totalPrice":cart.totalPrice} cannot be found */
            if (err) {
                // terminate this Cart.deleteProduct() early
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            /* Find out specific product to be removed from cart */
            const product = updatedCart.products.find(retrievedProduct => retrievedProduct.id === id);

            /* iii. if the specific product 'product' cannot be found using passed-in productId */
            if (!product) {
                console.log(`Passed-in ID: ${id} for this product is NOT found in the cart\n`);
                // Terminate this Cart.deleteProduct() early
                return; 
            } else {
                console.log(`Cart.deleteProduct()\nretrievedProduct{}:`);
                console.log(product);
                console.log(`\n`);
            }
            
            const productQty = product.qty;
            /* Remove specific product using .filter() */
            updatedCart.products = updatedCart.products.filter(eachProduct => eachProduct.id !== id);

            /* reduce updatedCart.totalPrice by n * specificProductPrice */
            updatedCart.totalPrice -= productPrice * productQty;

            console.log(`Logging updatedCart[{}] before writing into rootDir/data/cart.json:`);
            console.log(updatedCart);
            console.log(`\n`);

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {  
                console.log(`Error writing updatedCart\n{"products":[{"id":"productId","qty":productQty},{"id":"productId","qty":productQty}],"totalPrice":updatedCart.totalPrice}\n`);
                console.log(err);
                console.log(`\n`);
                
            });
        });
    }

    /* public static void method to accept a callback function which can be called once we get all products */
    static getCart(cb) {
        /* Retrieve all products inside rootDir/data/cart.json 
        return all products */
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            /* if err = no cart yet */
            if (err) {
                cb(null); // cb(null) to return nothing
            } else {
                cb(cart); // using cb to return cart
            }
        });
    }
}