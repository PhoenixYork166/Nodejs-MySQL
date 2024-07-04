const db = require('../util/database');
const Cart = require('./cart');

/* Defining the Interface for each new product product{}
using an ES6 a Class that specifies these class objectKeys 
e.g. productTitle, productImageUrl, productDescription, productPrice
*/
module.exports = class Product {
  constructor(id, title, price, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  /* To create a product
  public void Method to save current product instance either by updating an existing entry or adding a new entry if it does NOT already exist */
  save() {
    
  }

  /* public static void Method that accepts a productId
  to delete a specific product instance by productId from rootDir/data/products.json */
  static deleteById(id) {
    
  }

  /* Product.fetchAll() to connect to a database */
  static fetchAll() {
    const selectAllProducts = 'SELECT * FROM products';

    /* MySQL connector as a Promise */
    /* Instead of .then().catch(), our Global Scope receives SQL query result object by 'return' */
    return db.execute(selectAllProducts);
  }

  /* public static void method to find a product by its id */
  static findById(id) {
    
  }
};
