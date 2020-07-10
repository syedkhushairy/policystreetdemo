const sql = require('./db');
const bcrypt = require('bcrypt');

// constructor
const User = function (user) {
  this.login = user.login;
  this.password = user.password;
  this.user_type = user.user_type;
};

User.create = async (user, result) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  sql.query(
    'INSERT INTO users SET ?',
    {
      login: user.login,
      password: user.password,
      user_type: user.user_type,
    },
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('User has Been Created: ');
        result(null, res);
      }
    },
  );
};

User.findLogin = (email, result) => {
  sql.query(
    'SELECT id,login, password, user_type from users where `login` = ?',
    [email],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('User Found');
        result(null, res[0]);
      }
    },
  );
};

User.getProfileID = (login, result) => {
  sql.query('SELECT id, profile_id from users where `login` = ?', [login], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log('Id Found');
      result(null, res[0]);
    }
  });
};

User.updateProfileID = async (profile, result) => {
  sql.query(
    'UPDATE users SET `profile_id` = ? where `id` = ?',
    [profile.id, profile.user_id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('Users has been updated');
        result(null, { msg: 'Profile has been updated' });
      }
    },
  );
};

module.exports = User;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - login
 *          - password
 *          - user_type
 *        properties:
 *          login:
 *            type: string
 *            description: Login going to be unique.
 *          password:
 *            type: string
 *            description: Use for login.
 *          user_type:
 *            type: string
 *            description: value going to be either superadmin/admin/user
 *        example:
 *           login: SuperAdmin
 *           password: 123456
 *           user_type: superadmin
 */
