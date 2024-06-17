/*
Export a callback function to be used by routes/shop.js for 
rendering a 404 page in case of rootDir/views/404.ejs
*/
exports.get404 = (req, res, next) => {
  try {
    console.log(`Hosting views/404.ejs through router.use is in progress\n`);
    console.log(`Users requested an undefined page :O\n`);

    /* res.render('views/404.ejs', data) */
    res.status(404).render('404', { 
      pageTitle: 'Page Not Found',
      path: req.url ? req.url : '/404'
    });
  } catch (err) {
    console.error(`Error while rendering 404 page:\n${err}\n`);

    /* Check if HTTP headers have already been sent */
    if (res.headersSent) {
      /* If headers are sent, delegate to default Express error handler */
      next(err);
    } else {
      /* If HTTP headers are NOT sent, respond with a 500 Internal Server Error */
      res.status(501).send(`Error while trying to display 404 NOT found page :(`);
    }
  }
};
