var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Policy Street Demo' });
});

router.use('/profile', require('./profile').router);

// Other API route here
// router.use('/users', require('./users').router);
// router.use('/auth', require('./auth').router);
// router.use('/docs', swaggerUi.serve);
// router.get('/docs', swaggerUi.setup(swagger));

module.exports = router;
