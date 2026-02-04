const requests = new Map();

module.exports = function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60000;
  const max = 50;

  if (!requests.has(ip)) requests.set(ip, []);

  let timestamps = requests.get(ip).filter(t => now - t < windowMs);

  if (timestamps.length >= max) {
    const retryAfter = Math.ceil((windowMs - (now - timestamps[0])) / 1000);
    return res
      .status(429)
      .set('Retry-After', retryAfter)
      .json({ error: 'Too many requests' });
  }

  timestamps.push(now);
  requests.set(ip, timestamps);
  next();
};
