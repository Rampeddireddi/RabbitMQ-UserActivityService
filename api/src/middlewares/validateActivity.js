module.exports = function validateActivity(req, res, next) {
  const { userId, eventType, timestamp, payload } = req.body;

  if (!userId || typeof userId !== 'string')
    return res.status(400).json({ error: 'Invalid userId' });

  if (!eventType || typeof eventType !== 'string')
    return res.status(400).json({ error: 'Invalid eventType' });

  if (!timestamp || isNaN(Date.parse(timestamp)))
    return res.status(400).json({ error: 'Invalid timestamp' });

  if (typeof payload !== 'object')
    return res.status(400).json({ error: 'Invalid payload' });

  next();
};
