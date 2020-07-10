const sql = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('./users');
// constructor
const Auth = function (auth) {
  this.login = auth.login;
  this.password = auth.password;
};

Auth.login = (auth, result) => {
  User.findLogin(auth.login, async (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Unexpected Error',
      });
    } else {
      console.log(auth);
      const isMatch = await bcrypt.compare(auth.password, data.password);
      if (!isMatch) {
        result({ errors: [{ msg: 'Invalid Credentials' }] }, null);
      } else {
        const payload = {
          user: {
            id: data.id,
            type: data.user_type,
          },
        };
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
          if (err) throw err;
          console.log(token);
          result(null, { token });
        });
      }
    }
  });
};

module.exports = Auth;
