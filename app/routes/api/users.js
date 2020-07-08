const express = require('express');
const router = express.Router();
const { index, create } = require('../../controllers/users');

const { validateUser } = require('../../middleware/validator/userValidator');
router.get('/', index);
router.post('/', validateUser, create);

module.exports.router = router;
