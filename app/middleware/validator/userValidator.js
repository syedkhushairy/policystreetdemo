const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('login')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Login ID is required!')
    .isLength({ min: 6 })
    .withMessage('Minimum 6 characters required!')
    .bail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 6 })
    .withMessage('Please enter a password with 6 or more character!')
    .bail(),
  check('user_type')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter user type')
    .matches(/\b^(?:admin|user)$\b/)
    .withMessage('Please enter valid user type!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];
