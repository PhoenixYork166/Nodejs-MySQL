const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
/* Global p for access by any Product.method() */
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
      /* if error => always return an empty [] 
            return [];
      */
      // a callback to pass in an empty array[]
      cb([]);
    } else {
      /* 
      data/products.json | We have this design pattern
      products[
        {"productTitle1":"productValue1"}, {"productTitle2":"productValue2"}
      ]
      */
      // using the passed in callback 'cb' to parse JSON data
      cb(JSON.parse(fileContent));
    }
  });
};

/* Defining the Interface for each new product
using an ES6 a Class that specifies these class objectKeys 
e.g. productTitle, productImageUrl, productDescription, productPrice
*/
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /* Default a Public Method to append products[{}]
  into rootDir/data/products.json */
  save() {
    /* unique id for each product */
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.error(`Error occurred while JSON.stringifying products[{}] before fs.writeFile(path, dataContents)\n${err}`);
      });
    });
  }

  /*
  Allowing Class.method() access without 'extends'
  'static' = 'public static' in TypeScript
  a Class.method() need NOT to be instantiated before using
  */
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  /*
  public static void method to accept a productId as 'id'
  & accept a callback function as 'cb' to be executed 
  after finding out the product 
  */
  static findById(id, cb) {
    /* Using getProductsFromFile = () => {...} arrow function to retrieve all JSON.parse(products[{}]) */
    getProductsFromFile(products => {
      /* Sync code for Searching a specific product inside products[{}] then
      pass into another arrow function 
      if p.id matches the findById(id) => return product
      */
      const product = products.find(p => p.id === id);
      /* Then execute the callback 'cb' for found 'product' */
      cb(product);
    });
  }
};
