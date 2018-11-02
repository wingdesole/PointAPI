const morgan = require ('morgan');

module.exports = function (app) {
    app.use (morgan('short'))
};