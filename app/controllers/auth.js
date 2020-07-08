const Auth = require('../models/auth');

function index(req, res) {
  res.send({
    message: 'Auth api',
  });
}

function login(req, res) {
  const auth = new Auth({
    login: req.body.login,
    password: req.body.password,
  });

  Auth.login(auth, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Unexpected Error',
      });
    } else {
      res.send(data);
    }
  });
}

module.exports = { login, index };
