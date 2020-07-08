const express = require('express');
const router = express.Router();
const { get, create, update } = require('../../controllers/profile');

const { auth } = require('../../middleware/auth/auth');
const {
  validateProfile,
  validateUpdateProfile,
} = require('../../middleware/validator/profileValidator');

router.get('/', auth, get);
router.post('/', auth, validateProfile, create);
router.put('/', auth, validateUpdateProfile, update);

module.exports.router = router;
