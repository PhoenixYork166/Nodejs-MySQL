const path = require('path');

/* return the directory name of a path
process.mainModule has become deprecated since Node v14.0.0 */
// module.exports = path.dirname(process.mainModule.filename);

// rootDir
module.exports = path.dirname(require.main.filename);