const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

router.get('/', profileController.list);

// post, put, delete for /profile

module.exports.router = router;