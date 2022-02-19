const nodeCashe = require("node-cache");
const cache = new nodeCashe();
module.exports = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    console.error("Cannot cache not GET method");
    return next();
  }

  const key = req.originalUrl;
  console.log(key);
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    console.log(`cache hit fo0r key ${key}`);
    res.send(cachedResponse);
  } else {
    console.log(`cache miss for key ${key}`);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
