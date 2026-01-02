const redis = require("../config/redis");

const cacheMiddleware = (keyBuilder, ttl = 600) => {
    return async (req, res, next) => {
        const cacheKey = keyBuilder(req);

        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            return res.json({
                source: "redis",
                data: JSON.parse(cachedData),
            });
        }

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            if (body && body.data) {
                redis.set(cacheKey, JSON.stringify(body.data), "EX", ttl);
            }
            originalJson(body);
        };

        next();
    };
};

module.exports = cacheMiddleware;
