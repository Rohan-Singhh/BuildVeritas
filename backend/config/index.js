const middleware = require('./middleware');
const database = require('./database');
const routes = require('./routes');
const errorHandlers = require('./errorHandlers');

module.exports = {
  middleware: middleware,
  database: database,
  routes: routes,
  errorHandlers: errorHandlers
};
