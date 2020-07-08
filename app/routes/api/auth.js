const express = require('express');
const router = express.Router();
const auth = require('../../controllers/auth');
const { validateAuth } = require('../../middleware/validator/authValidator');
router.get('/', auth.index);
router.post('/', validateAuth, auth.login);

module.exports.router = router;
