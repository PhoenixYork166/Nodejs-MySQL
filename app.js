const express = require('express');
const path = require('path');
/* Express now has built-in req.body parse */
// const bodyParser = require('body-parser');
const rootDir = require('./util/path');
const errorController = require('./controllers/error');
const db = require('./util/database');
const app = express();
console.log(`root directory is:\n${rootDir}`);

/* Configuring Express.js to use EJS as its templating engine */
app.set('view engine', 'ejs');
/* This tells Express the path to find template files
1st 'views' = rootDir/views folder 
2nd 'views' = name of directory */
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Express.js bodyParser is deprecated...
app.use(express.urlencoded({ extended: false }));
// For parsing application/json
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

/* As we changed the way we export objects in routes/admin.js */
app.use('/admin', adminRoutes);
/* Using Express middleware for shopRoutes routes/shop.js */
app.use(shopRoutes);

/* Using Express middleware for 404 routes routes/404.js */
app.use(errorController.get404);

/* Error Handling middleware for all Non-defined routes */
app.use((error, req, res, next) => {
    console.error(`Error: ${error.message}`);
    res.status(error.status || 501).send({ 
        message: error.message || `Server Internal Error`,
        error: process.env.NODE_ENV === 'development' ? error : {}
    });
})

const port = 3005;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
