const express = require('express');
const cors = require('cors');
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

// CORs
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

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
