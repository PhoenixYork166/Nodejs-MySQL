const Product = require('../models/product');

/* 
For GET request to http://localhost:3005/admin/add-product route
Export a callback function to be used by routes/admin.js for 
rendering rootDir/views/admin/add-product.ejs
*/
exports.getAddProduct = (req, res, next) => {
    console.log(`Hosting views/admin/add-product.ejs through router.get\nfor http://localhost:3005/admin/add-product\n`);
    /*  
      res.render('views/admin/add-product.ejs', data) defaults to rootDir/views
      res.render('.ejs', data) will look up .ejs files
      & pass in templates
    */
    res.render('admin/add-product', {
      path: req.url ? req.url : '/admin/add-product',
      pageTitle: 'Add Product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
};
  
/* 
For POST request to http://localhost:3005/admin/add-product route 
Export a callback function to be used by routes/admin.js for 
storing users input 'new product item' to data/products.json
*/
exports.postAddProduct = (req, res, next) => {
    console.log(`Hosting POST request handler for http://localhost:3005/admin/add-product Node API is in progress\n`);

    /* Best Practice to use ES6 Object Destructuring to destructure
    parameters from Browser req.body.fields for easier implementation */
    const { title, imageUrl, price, description } = req.body;
    
    console.log(`Console logging all req.body.field:\n`);
    console.log(`req.body.title:\n${title}\n`);
    console.log(`req.body.title:\n${imageUrl}\n`);
    console.log(`req.body.title:\n${price}\n`);
    console.log(`req.body.title:\n${description}\n`);
  
    /* Referring to our model (product interface) inside
    rootDir/models/product.js */
    /* class Product {
        constructor(title, imageUrl, description, price) {
            this.title = title;
            this.imageUrl = imageUrl;
            this.description = description;
            this.price = price;
        }
    */
    /* Create a new product{} by instantiating class Product {}
    before storing into products[{},{}...]
    const product = new Product(title); 
    */
    const product = new Product(title, imageUrl, description, price);
    
    /* using Product.save() public method after instantiation of class Product {} to save a product */
    product.save();
    res.status(301).redirect('/');
};

/* 
For GET request to http://localhost:3005/admin/products route
Export a callback function to be used by routes/admin.js for 
rendering rootDir/views/admin/products.ejs
*/
exports.getProducts = (req, res, next) => {
    console.log(`Hosting views/admin/products.ejs through router.get is in progress\nfor http://localhost:3005/admin/products\n`);

    /* 
    using 'public static void method' Product.fetchAll(cb): void
    to retrieve products[{}] stored in data/products.json file 
    */
    Product.fetchAll(products => {
        /* Calling back products stored in ./routes/shop.js
        router.get('/admin/products', adminController.getProducts); */
        console.log(`routes/admin.js\nadminController.getProducts:`);
        console.log(products);
        console.log(`\n`);

        /*
        Main Node rootDir/app.js implements EJS Templating Engine
        app.set('view engine', 'ejs');
        within this module => res.render() EJS templates
        rendering rootDir/views/admin/products.ejs template
        */
        res.render('admin/products', {
        path: req.url ? req.url : '/admin/products',
        pageTitle: 'Products (admin-view)',
        prods: products,
        /* These attributes are ONLY necessary when using Handlebars
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
        */
        });
    });
};