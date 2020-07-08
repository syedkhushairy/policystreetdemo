const sql = require('./db');
const User = require('./users');

// constructor
const Profile = function (profile) {
  this.user_id = profile.user_id;
  this.id = profile.id;
  this.first_name = profile.first_name;
  this.last_name = profile.last_name;
  this.email = profile.email;
};

Profile.get = (user, result) => {
  sql.query(
    'SELECT profile_id as id, first_name, last_name, email from users join profiles ON profiles.id = profile_id where users.id = ?',
    [user],
    (err, res) => {
      if (err) {
        console.log('here');
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('User Found');
        result(null, res[0]);
      }
    },
  );
};

function get(user) {
  const result = sql
    .promise()
    .query(
      'SELECT profile_id as id, first_name, last_name, email from users join profiles ON profiles.id = profile_id where users.id = ?',
      [user],
    )
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch((err) => {
      return err;
    });
  return result;
}

Profile.create = (profile, result) => {
  const getProfile = Profile.get;

  getProfile(profile.user_id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Unexpected Error',
      });
    } else {
      if (data !== undefined) {
        result({ message: 'Already has a profile use UPDATE(PUT)' }, null);
      }
    }
  });

  sql.query(
    'INSERT INTO profiles SET ?',
    {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
    },
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('Profile has Been Created: ');
        profile.id = res.insertId;
        User.updateProfileID(profile, (err, data) => {
          if (err) {
            console.log('error: ', err);
            result(err, null);
          } else {
            console.log('User profile id has been created');
            result(null, data);
          }
        });
      }
    },
  );
};

Profile.update = async (profile, result) => {
  const getProfile = Profile.get;
  getProfile(profile.user_id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Unexpected Error',
      });
    } else {
      if (data === undefined) {
        result({ message: 'User dont have any profile yet' }, null);
      } else {
        if (data.profile_id === profile.id) {
          const first_name =
            profile.first_name !== data.first_name && profile.first_name !== undefined
              ? profile.first_name
              : data.first_name;
          const last_name =
            profile.last_name !== data.first_name && profile.last_name !== undefined
              ? profile.last_name
              : data.last_name;
          const email =
            profile.email !== data.email && profile.email !== undefined
              ? profile.email
              : data.email;

          sql.query(
            'UPDATE profiles SET `first_name` = ?, `last_name` = ?, `email`= ? where `id` = ?',
            [first_name, last_name, email, data.profile_id],
            (err, res) => {
              if (err) {
                console.log('error: ', err);
                result(err, null);
              } else {
                console.log('Profile has been updated');
                result(null, { msg: 'Profile has been updated' });
              }
            },
          );
        } else {
          console.log('Profile id is wrong');
          result({ message: 'Profile id is wrong' }, null);
        }
      }
    }
  });
};

Profile.delete = async (profile, result) => {
  const getProfile = await get(profile.user_id);
  if (getProfile === undefined) {
    console.log('No Profile yet');
    result({ message: 'User dont have any profile yet' }, null);
    return;
  }
  if (getProfile.id === profile.id) {
    sql
      .promise()
      .query('DELETE FROM `profiles` WHERE `id` = ?', [getProfile.id])
      .then(([rows, fields]) => {
        console.log('Profile has been deleted');
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    sql
      .promise()
      .query('UPDATE users SET `profile_id` = 0 where `id` = ?', [profile.user_id])
      .then(([rows, fields]) => {
        console.log('User has been updated');
        result(null, { msg: 'Profile has been deleted' });
      })
      .catch((err) => {
        console.log(err);
        result(err, null);
      });
  } else {
    console.log('Profile id is wrong');
    result({ message: 'Profile id is wrong' }, null);
  }
};

module.exports = Profile;
