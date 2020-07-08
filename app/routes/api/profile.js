const express = require('express');
const router = express.Router();
const { get, create, update, deleteProfile } = require('../../controllers/profile');

const { auth } = require('../../middleware/auth/auth');
const {
  validateProfile,
  validateUpdateProfile,
  validateDeleteProfile,
} = require('../../middleware/validator/profileValidator');

router.get('/', auth, get);
router.post('/', auth, validateProfile, create);
router.put('/', auth, validateUpdateProfile, update);
router.delete('/', auth, validateDeleteProfile, deleteProfile);

module.exports.router = router;
