const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

// Track Email route
router.get('/:trackingId', trackController.trackEmail);

module.exports = router;
