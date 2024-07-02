const mysql = require('mysql2');

/* 2 ways of connecting to MySQL database */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node-complete'
});

/* To alllow running of Async code using Promises
instead of Nested code */
module.exports = pool.promise();