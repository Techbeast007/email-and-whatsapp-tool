const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');
const validateDesign = require('../middlewares/validateDesign');

// Route to save the design
router.post('/design', validateDesign, designController.saveDesign);

module.exports = router;
