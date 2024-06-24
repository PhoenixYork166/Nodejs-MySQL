const Product = require('../models/product');

/* 
For GET request to http://localhost:3005/admin/add-product route
Export a callback function to be used by routes/admin.js for 
rendering rootDir/views/admin/edit-product.ejs
*/
exports.getAddProduct = (req, res, next) => {
    console.log(`Hosting views/admin/edit-product.ejs through router.get\nfor http://localhost:3005/admin/add-product\n`);
    /*  
      res.render('views/admin/edit-product.ejs', data) defaults to rootDir/views
      res.render('.ejs', data) will look up .ejs files
      & pass in templates
    */
    res.render('admin/edit-product', {
      path: req.url ? req.url : '/admin/add-product',
      pageTitle: 'Add Product',
      editing: false
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
    parameters from Browser req.body.params for easier implementation */
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
    const product = new Product(null, title, imageUrl, description, price);
    
    /* using Product.save() public method after instantiation of class Product {} to save a product */
    product.save();
    res.status(301).redirect('/');
};

/*
For GET request to http://localhost:3005/admin/edit-product/:productId route
Export a callback function to be used by routes/admin.js for
rendering rootDir/views/admin/edit-product.ejs &
also passing in product information
*/
exports.getEditProduct = (req, res, next) => {
    console.log(`Hosting views/admin/edit-product.ejs through router.get\nfor http://localhost:3005/admin/edit-product/:productId?edit=true\n`);
    /* Express built-in req.query.edit === 'true' */
    const editMode = req.query.edit;
    console.log(`editMode: ${editMode}\n`);
    if (!editMode) {
        console.log(`req.query.edit !== true\nRedirecting to /`);
        // Redirect to '/', if 'editMode !== true' undefined||false 
        return res.status(303).redirect(303, '/');
    }
    /* 
    i. We'll need productId as a passed-in parameter for
    public static void method 
    Product.findById(id, cb) to accept prodId => 
    Declare callback function to do backend logic

    ii. Retrieving productId from Express route path
    e.g. http://localhost:3005/admin/edit-product/:productId?edit=true 
    We have a Dynamic segment rootDir/routes/admin.js 
    router.get('/edit-product/:productId', adminController.getEditProduct);
    */
    const prodId = req.params.productId;
    Product.findById(prodId, retrievedProduct => {
        if (!retrievedProduct) {
            return res.status(303).redirect(303, '/');
        }
        res.render('admin/edit-product', {
            path: req.url ? req.url : `/admin/edit-products`,
            pageTitle: 'Edit Product',
            editing: editMode,
            product: retrievedProduct
        });
    });
};

/*
For POST request to http://localhost:3005/admin/edit-product route
Export a callback function to be used by routes/admin.js for storing edited product attributes into rootDir/data/products.json
*/
exports.postEditProduct = (req, res, next) => {
    /* 
    i. Fetch information for the product
    ii. Create a new product instance populated with that fetched info => call Product.save() public void method
    */
    // Extracting a product.id from req.body when editing a product
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    
    /* Create new product{} object by Instantiating class Product */
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    console.log(`updatedProduct.id: ${prodId}\nupdatedProduct.title: ${updatedTitle}\nupdatedProduct.imageUrl: ${updatedImageUrl}\nupdatedProduct.description: ${updatedDescription}\nupdatedProduct.price: ${updatedPrice}\n`);
    /* After class Instantiation => can invoke public void method updatedProduct.save() to over-write existing product {} */
    updatedProduct.save();
    /* After updatedProduct.save() => redirect to '/admin/product'*/
    res.status(301).redirect('/admin/products');
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