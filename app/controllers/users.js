const User = require('../models/users');

function index(req, res) {
  res.send({
    message: 'Users2 api',
  });
}

function create(req, res) {
  const user = new User({
    login: req.body.login,
    password: req.body.password,
    user_type: req.body.user_type,
  });

  User.create(user, (err, data) => {
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

module.exports = { index, create };
