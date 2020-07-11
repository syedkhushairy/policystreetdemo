const sql = require('./db');
const bcrypt = require('bcrypt');

// constructor
function User(user) {
  this.login = user.login;
  this.password = user.password;
  this.user_type = user.user_type;
}

// User.create = async (user, result) => {
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   sql.query(
//     'INSERT INTO users SET ?',
//     {
//       login: user.login,
//       password: user.password,
//       user_type: user.user_type,
//     },
//     (err, res) => {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         console.log('User has Been Created: ');
//         result(null, res);
//       }
//     },
//   );
// };

async function create(user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const users = {
    login: user.login,
    password: user.password,
    user_type: user.user_type,
  };
  const result = await sql
    .promise()
    .query('INSERT INTO users SET ?', users)
    .then(([rows]) => {
      console.log(rows);
      return { success: rows.affectedRows === 1, data: rows[0] };
    })
    .catch((err) => {
      console.log(err);
      return { success: false, err };
    });
  return result;
}

async function findLogin(email) {
  const result = sql
    .promise()
    .query('SELECT id,login, password, user_type from users where `login` = ?', [email])
    .then(([rows]) => {
      console.log(rows);
      return { result: rows.length === 1, data: rows[0] };
    })
    .catch((err) => {
      console.log(err);
      return { result: false, err };
    });
  return result;
}

async function updateProfileID(profile) {
  const result = await sql
    .promise()
    .query('UPDATE users SET `profile_id` = ? where `id` = ?', [profile.id, profile.user_id])
    .then(([rows]) => {
      return { result: rows.affectedRows === 1 };
    })
    .catch((err) => {
      console.log(err);
      return { result: false, err };
    });

  return result;
}

module.exports = { User, create, updateProfileID, findLogin };
