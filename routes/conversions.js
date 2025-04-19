const express = require('express');
const router = express.Router();
const { 
  convertTemperature,
  convertWeight,
  convertDistance 
} = require('../controllers/conversions');

router.post('/temperature', convertTemperature);
router.post('/weight', convertWeight);
router.post('/distance', convertDistance);

module.exports = router;