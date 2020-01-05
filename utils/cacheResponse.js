// cache only is activated when develop mode is no active
const { config } = require('../config/index');

function cacheResponse(res, seconds) {
  if (!config.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;
