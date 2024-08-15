const mysql = require('mysql2');

/* 2 ways of connecting to MySQL database */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rootGor1',
    database: 'node-complete'
});

/* Get a connection to check if the pool connects successfully */
pool.getConnection((err, connection) => {
    if (err) {
        console.log(`Error connecting to the database:`);
        console.log(err);
        console.log(`\n`);
    } else {
        console.log(`OK Succeeded in connecting to database:`);
        console.log(`connection is as below:`);
        console.log(connection);
        console.log(`\n`);
    }
});

/* To alllow running of Async code using Promises
instead of Nested code */
module.exports = pool.promise();