const express = require('express');
const router = express.Router();

var application_controller = require('../controllers/application_controller');

// Set main app routes
router.get('/', application_controller.index);

router.get('/saved', application_controller.saved);

module.exports = router;