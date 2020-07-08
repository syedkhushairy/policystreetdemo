const express = require('express');
const router = express.Router();
const users = require('../../controllers/users');
const { validateUser } = require('../../middleware/validator/userValidator');
router.get('/', users.index);
router.post('/', validateUser, users.create);

module.exports.router = router;
