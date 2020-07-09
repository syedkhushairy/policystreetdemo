const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs');
router.get('/', function (req, res) {
  res.send('Welcome to Node JS V1');
});

router.use('/users', require('./api/users').router);
router.use('/profile', require('./api/profile').router);
router.use('/auth', require('./api/auth').router);
router.use('/docs', swaggerUi.serve);
router.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);
module.exports.router = router;
