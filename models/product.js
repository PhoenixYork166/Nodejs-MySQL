const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

/* Define a path 'p' that points to rootDir/data/products.json file 
Global 'p' can be accessed by any Product.method() */
const p = path.join(
  rootDir,
  'data',
  'products.json'
);

/* This is a Global Scope Helper function to be called
inside class Product.method() for reading file contents
from rootDir/data/products.json file
*/
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      /* if there's an error reading the file =>
      invoke the callback with an empty array[] */
      cb([]);
    }
    else {
      // Parse JSON content of file & pass the result to cb callback
      cb(JSON.parse(fileContent));
    }
  });
};

/* Defining the Interface for each new product product{}
using an ES6 a Class that specifies these class objectKeys 
e.g. productTitle, productImageUrl, productDescription, productPrice
*/
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /* Default public void Method to save current product instance either by updating an existing entry or adding a new entry if it does NOT already exist */
  save() {
    getProductsFromFile(products => {
      /* If this.id (product.id) already exists
      public void method save() should NOT randomly create this.id public void method save() should update existing this.id 
      */
      if (this.id) {
        /* Find the Index of the product in products[{}] that matches the current product.id by
        Declaring existingProductIndex using .findIndex() to match current product.id (this.id) against each stored product{} inside products[{}] fetched from rootDir/data/products.json */
        const existingProductIndex = products.findIndex(retrievedProduct => retrievedProduct.id === this.id);
        
        /* Use Spread Operator [...] to copy products[{}] */
        const updatedProducts = [...products];
        /* Replace existing product{} using existingProductIndex with this (newly created product{}) */
        updatedProducts[existingProductIndex] = this;

        /* After replace old product{} inside updatedProducts[{}]=> 
        write updatedProducts[{}] into rootDir/data/products.json */
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(`Error occurred while JSON.stringifying updatedProducts[{}] before fs.writeFile(path, dataContents)\n${err}`);
        });
      } else {
        /* If NO existing this.id => assign a random product.id */
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(`Error occurred while JSON.stringifying products[{}] before fs.writeFile(path, dataContents)\n${err}`);
        });
      }
    });
  }

  /*
  public static void method to allow invoking Class.method() without instantiation e.g. 'extends' OR 'new Product'
  */
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  /*
  public static void method to find a product by its id & invoke the callback (cb) with the found product or undefined if NOT found
  */
  static findById(id, cb) {
    /* Using getProductsFromFile = () => {...} arrow function to retrieve all JSON.parse(products[{}]) */
    getProductsFromFile(products => {
      /* Sync code for Searching a specific product inside products[{}] then pass into another arrow function 
      if p.id matches the findById(id) => return product
      */
      const product = products.find(p => p.id === id);
      /* Then execute the callback 'cb' for found 'product' */
      cb(product);
    });
  }
};
