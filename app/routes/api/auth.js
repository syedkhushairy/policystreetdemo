const express = require('express');
const router = express.Router();
const { index, login } = require('../../controllers/auth');

const { validateAuth } = require('../../middleware/validator/authValidator');
router.get('/', index);
router.post('/', validateAuth, login);

module.exports.router = router;
