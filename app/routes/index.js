var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Welcome to Node JS V1');
});

router.use('/users', require('./api/users').router);
router.use('/profile', require('./api/profile').router);
router.use('/auth', require('./api/auth').router);

module.exports.router = router;
