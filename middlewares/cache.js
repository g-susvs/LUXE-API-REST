const getExpeditiousCache = require('express-expeditious');

const defaltOptions = {
    namespace: 'expresscache',
    defaultTtl: '1 minute'
  };

const cacheInit = getExpeditiousCache(defaltOptions);

module.exports = {cacheInit}