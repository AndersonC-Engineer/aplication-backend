const { getCache, setCache } = require('../config/redis');

const cache = (ttlSeconds = 300) => {
  return (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    getCache(key).then(cached => {
      if (cached) {
        return res.json(cached);
      }

      const originalJson = res.json.bind(res);
      res.json = (body) => {
        setCache(key, body, ttlSeconds);
        originalJson(body);
      };
      next();
    }).catch(() => next());
  };
};

const clearCacheFor = (...prefixes) => {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      originalJson(body);
      if (res.statusCode < 400) {
        const { invalidatePrefix } = require('../config/redis');
        prefixes.forEach(p => invalidatePrefix(p));
      }
    };
    next();
  };
};

module.exports = { cache, clearCacheFor };
