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
  const result = await userLogin(auth);

  if (result.success) {
    res.status(200).send(result.token);
  } else {
    console.log(result.err);
    res.status(500).send({
      message: result.message || 'Unexpected Error',
    });
  }
}

module.exports = { login, index };
