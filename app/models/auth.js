const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const { findLogin } = require('./users');

function Auth(auth) {
  this.login = auth.login;
  this.password = auth.password;
}

async function login(auth) {
  const { result, data } = await findLogin(auth.login);
  if (result) {
    const isMatch = await bcrypt.compare(auth.password, data.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid Credentials' };
    } else {
      const payload = {
        user: {
          id: data.id,
          type: data.user_type,
        },
      };
      let result;
      try {
        result = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 });
      } catch (err) {
        console.log(err);
        return { success: false, err };
      }

      return { success: true, token: result };
    }
  }
}

module.exports = { Auth, login };
