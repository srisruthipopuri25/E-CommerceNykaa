const redis = require("../config/redis");

const getCache = async (key) => {
  console.log("rediss data")
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

const setCache = async (key, value, ttl = 3600) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
};

const deleteCache = async (key) => {
  await redis.del(key);
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};
