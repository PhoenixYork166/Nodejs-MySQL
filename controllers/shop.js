/* Import class Product from rootDir/models/product.js
to access Product.fetchAll() public static void method
without instantiation */
const Product = require('../models/product');

/* 
Export a callback function to be used by routes/shop.js for 
rendering rootDir/views/shop/product-list.ejs
*/
exports.getProducts = (req, res, next) => {
  /* This allows us to hook into this Funnel 
  through which the HTTP request to send */
  console.log(`Hosting views/shop/product-list.ejs\nthrough router.get is in progress\nfor http://localhost:3005/products\n`);

  /* 
  using 'public static void method' Product.fetchAll(cb): void
  to retrieve products[{}] stored in data/products.json file 
  */
  Product.fetchAll(products => {
    /* Calling back products stored in ./routes/shop.js
    router.get('/products', shopController.getProducts); */
    console.log(`routes/shop.js\nshopController.getProducts:`);
    console.log(products);
    console.log(`\n`);

    /*
    Main Node rootDir/app.js implements EJS Templating Engine
    app.set('view engine', 'ejs');
    within this module => res.render() EJS templates
    rendering rootDir/views/shop/product-list.ejs template
    */
    res.render('shop/product-list', {
      path: req.url ? req.url : '/products',
      pageTitle: 'All Products',
      prods: products,
      /* These attributes are ONLY necessary when using Handlebars
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
      */
    });
  });
};

/* 
Export a callback function to be used by routes/shop.js for 
rendering rootDir/views/shop/index.ejs
*/
exports.getIndex = (req, res, next) => {
  console.log(`Hosting of views/shop/index.ejs\nthrough router.get is in progress\nfor http://localhost:3005/\n`);
  /* 
  using 'public static void method' Product.fetchAll(cb): void
  to retrieve products[{}] stored in data/products.json file 
  */
  Product.fetchAll(products => {
    /* Calling back products stored in ./routes/shop.js
    router.get('/', shopController.getIndex); */
    console.log(`routes/shop.js\nshopController.getIndex:`);
    console.log(products);
    console.log(`\n`);

    /*
    Main Node rootDir/app.js implements EJS Templating Engine
    app.set('view engine', 'ejs');
    within this module => res.render() EJS templates
    rendering rootDir/views/shop/index.ejs template
    */
    res.render('shop/index', {
      path: req.url ? req.url : '/',
      pageTitle: 'Shop',
      prods: products,
      /* These attributes are ONLY necessary when using Handlebars
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
      */
    });
  });
};

/* 
Export a callback function to be used by routes/shop.js for 
rendering rootDir/views/shop/cart.ejs
*/
exports.getCart = (req, res, next) => {
  console.log(`Hosting of views/shop/cart.ejs through router.get is in progress\nfor http://localhost:3005/cart\n`);
  /*
    Main Node rootDir/app.js implements EJS Templating Engine
    app.set('view engine', 'ejs');
    within this module => res.render() EJS templates
    rendering rootDir/views/shop/cart.ejs template
  */
  res.render('shop/cart', {
    path: req.url ? req.url : '/cart',
    pageTitle: 'Your Cart',
  })
};

/* 
Export a callback function to be used by routes/shop.js for 
rendering rootDir/views/shop/orders.ejs
*/
exports.getOrders = (req, res, next) => {
  console.log(`Hosting of views/shop/orders.ejs through router.get is in progress\nfor http://localhost:3005/orders\n`);
  /*
    Main Node rootDir/app.js implements EJS Templating Engine
    app.set('view engine', 'ejs');
    within this module => res.render() EJS templates
    rendering rootDir/views/shop/orders.ejs template
  */
  res.render('shop/orders', {
    path: req.url ? req.url : '/orders',
    pageTitle: 'Your Orders',
  })
};

/* 
Export a callback function to be used by routes/shop.js for 
rendering rootDir/views/shop/checkout.ejs
*/
exports.getCheckout = (req, res, next) => {
  console.log(`Hosting of views/shop/checkout.ejs through router.get is in progress\nfor http://localhost:3005/checkout\n`);
  /*
    Main Node rootDir/app.js implements EJS Templating Engine
    app.set('view engine', 'ejs');
    within this module => res.render() EJS templates
    rendering rootDir/views/shop/checkout.ejs template
  */
  res.render('shop/cart', {
    path: req.url ? req.url : '/checkout',
    pageTitle: 'Checkout',
  })
};
