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

  /* To react out to MySQL database => 
  Save data there 
  public method() = instance method() => Use Syntax
  [this.title, this.price, this.description, this.imageUrl]
  */
  save() {
    // Return SQL query result as a Promise
    /* To avoid SQL Injection attack pattern
    db.execute(SQL, [param1, param2, param3, param4]); */
    return db.execute(
      'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', 
      [this.title, this.price, this.description, this.imageUrl]
    );
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

  /* public static method that finds a product by its id & returns a Promise => Uses Syntax [id] */
  static findById(id) {
    return db.execute(
      'SELECT * FROM products WHERE products.id = ?', 
      [id]
    );
  }
};
