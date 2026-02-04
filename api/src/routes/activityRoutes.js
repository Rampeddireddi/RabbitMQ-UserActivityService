const router = require('express').Router();
const { ingestActivity } = require('../controllers/activityController');
const rateLimiter = require('../middlewares/rateLimiter');
const validateActivity = require('../middlewares/validateActivity');

router.post('/', validateActivity, rateLimiter, ingestActivity);

module.exports = router;
