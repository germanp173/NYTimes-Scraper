const express = require('express');
const router = express.Router();

var application_controller = require('../controllers/application_controller');

// Set main app routes
router.get('/', application_controller.index);

router.get('/scrape', application_controller.scrape);

router.get('/saved', application_controller.saved);

router.get('/article/:id', application_controller.article);

router.post('/article/:id', application_controller.updateNote);

router.post('/save', application_controller.save);

router.delete('/clear', application_controller.clear);

module.exports = router;