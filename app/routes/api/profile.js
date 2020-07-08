const express = require('express');
const router = express.Router();
const profile = require('../../controllers/profile');
const { auth } = require('../../middleware/auth/auth');
const {
  validateProfile,
  validateUpdateProfile,
} = require('../../middleware/validator/profileValidator');

// router.get('/', profile.index);
router.get('/', auth, profile.get);
router.post('/', auth, validateProfile, profile.create);
router.put('/', auth, validateUpdateProfile, profile.update);

module.exports.router = router;
