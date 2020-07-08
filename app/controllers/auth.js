const Auth = require('../models/auth');

exports.index = (req, res) => {
  res.send({
    message: 'Auth api',
  });
};

exports.login = async (req, res) => {
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

  // res.send({
  //     message: 'Try to login?',
  // })
};
