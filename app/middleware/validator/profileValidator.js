const { check, validationResult } = require('express-validator');

exports.validateProfile = [
  check('first_name').trim().escape().not().isEmpty().withMessage('First Name is required!').bail(),
  check('last_name').trim().not().isEmpty().withMessage('Last Name is required!').bail(),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter valid email!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateProfile = [
  check('id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ID is required!')
    .isNumeric()
    .withMessage('ID should be only number')
    .bail(),
  check('email').trim().isEmail().withMessage('Please enter valid email!').bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.validateDeleteProfile = [
  check('id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ID is required!')
    .isNumeric()
    .withMessage('ID should be only number')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
