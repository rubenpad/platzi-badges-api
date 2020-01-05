const express = require('express');
const debug = require('debug')('app:server');
const app = express();

const { config } = require('./config/index');
const badgesApi = require('./routes/badges');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body-parser
app.use(express.json());

// routes
badgesApi(app);

// catch 404
app.use(notFoundHandler);

// errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  debug(`App linstening on http://localhost:${config.port}`);
});
