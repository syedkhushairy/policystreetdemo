const { Auth, login: userLogin } = require('../models/auth');

function index(req, res) {
  res.send({
    message: 'Auth api',
  });
}

async function login(req, res) {
  const auth = new Auth({
    login: req.body.login,
    password: req.body.password,
  });
  const { success, message, token } = await userLogin(auth);
  if (success) {
    res.status(200).send(token);
  } else {
    res.status(500).send({
      message: message || 'Unexpected Error',
    });
  }
}

module.exports = { login, index };
