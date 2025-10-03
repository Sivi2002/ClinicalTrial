// analytics routes
const express = require('express');
const router = express.Router();
const analytics = require('../controllers/analyticsController');

router.get('/locations', analytics.getLocations);
router.get('/trials-per-city', analytics.getTrialsPerCity);
router.get('/demographics', analytics.getDemographics);

module.exports = router;
