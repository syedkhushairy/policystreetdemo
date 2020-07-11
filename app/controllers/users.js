const { User, create: createUser } = require('../models/users');
const e = require('express');

function index(req, res) {
  res.send({
    message: 'Users2 api',
  });
}

async function create(req, res) {
  const user = new User({
    login: req.body.login,
    password: req.body.password,
    user_type: req.body.user_type,
  });

  const { success, error } = await createUser(user);

  if (success) {
    res.status(200).send({ message: 'Successsfully register user' });
  } else {
    res.status(500).send({
      message: err.message || 'Unexpected Error',
    });
  }
}

module.exports = { index, create };
