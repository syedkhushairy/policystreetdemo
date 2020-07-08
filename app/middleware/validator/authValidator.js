const { check, validationResult } = require('express-validator');

exports.validateAuth = [
    check('login')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Login ID is required!')
        .bail(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required!'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];