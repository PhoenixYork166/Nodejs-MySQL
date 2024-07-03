/* Copy & Paste code below into rootDir/app.js */
/* Top-level import */
const db = require('./util/database');

/* Paste below Middleware */
const selectAllProducts = 'SELECT * FROM products';
/* To execute a SQL to connection pool as a Promise */
db.execute(selectAllProducts)
.then((result) => {
    console.log(`Result of performing database operation below:`);
    console.log(`result[0]:`);
    console.log(result[0]);
    console.log(`result[1]:`);
    console.log(result[1]);
    for(let i=0; i < result[1].length; i++) {
        console.log(`result[1][${i}]:`);
        console.log(result[1][i]);
    }
    console.log(`\n`);
})
.catch((err) => {
    if (err) {
        console.log(`Error occurred when performing database operation below:\n${selectAllProducts}`);
        console.log(`Error:\n${err}`);
        console.log(`\n`);
    }
});