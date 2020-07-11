const sql = require('./db');
const { User, updateProfileID } = require('./users');
const e = require('express');

function Profile(profile) {
  this.user_id = profile.user_id;
  this.id = profile.id;
  this.first_name = profile.first_name;
  this.last_name = profile.last_name;
  this.email = profile.email;
}

async function get(user) {
  const result = await sql
    .promise()
    .query(
      'SELECT profile_id as id, first_name, last_name, email from users join profiles ON profiles.id = profile_id where users.id = ?',
      [user],
    )
    .then(([rows]) => {
      return { success: true, data: rows[0] };
    })
    .catch((err) => {
      console.log(err);
      return { success: false, err };
    });
  return result;
}

async function create(profile) {
  const data = await get(profile.user_id);

  if (data.data !== undefined) {
    return { result: false, message: 'Already has a profile use UPDATE(PUT)' };
  }

  const result = await sql
    .promise()
    .query('INSERT INTO profiles SET ?', {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
    })
    .then(async ([rows]) => {
      profile.id = rows.insertId;
      const result = await updateProfileID(profile);
      return { update: result, success: true };
    })
    .catch((err) => {
      console.log(err);
      return { error: true, err };
    });

  return result;
}

async function update(profile) {
  const getProfile = await get(profile.user_id);
  if (getProfile.data === undefined || !getProfile.result) {
    return sendProfileNotFound(getProfile);
  }

  if (getProfile.data.id === profile.id) {
    const data = getProfile.data;
    const first_name =
      profile.first_name !== data.first_name && profile.first_name !== undefined
        ? profile.first_name
        : data.first_name;
    const last_name =
      profile.last_name !== data.last_name && profile.last_name !== undefined
        ? profile.last_name
        : data.last_name;
    const email =
      profile.email !== data.email && profile.email !== undefined ? profile.email : data.email;
    const result = await sql
      .promise()
      .query('UPDATE profiles SET `first_name` = ?, `last_name` = ?, `email`= ? where `id` = ?', [
        first_name,
        last_name,
        email,
        data.id,
      ])
      .then(([rows]) => {
        console.log('Profile has been updated');
        return {
          success: rows.affectedRows === 1,
          message: 'Profile has been updated',
        };
      })
      .catch((err) => {
        console.log(err);
        return { unexpectedError: true, err };
      });
    return result;
  } else {
    console.log('Profile id is wrong');
    return { message: 'Profile id is wrong', wrongProfileID: true };
  }
}

async function deleteProfile(profile) {
  const { data, result } = await get(profile.user_id);

  if (data === undefined || !result) {
    return sendProfileNotFound(getProfile);
  }

  if (data.id === profile.id) {
    let result = {};

    result.update = await sql
      .promise()
      .query('UPDATE userss SET `profile_id` = 0 where `id` = ?', [profile.user_id])
      .then(([rows]) => {
        return {
          result: rows.affectedRows === 1,
          message: 'Profile has been deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return { result: false, err };
      });
    //kalau x nk keep data can keep this part.
    //atas dah soft delete
    result.delete = await sql
      .promise()
      .query('DELETE FROM `profiless` WHERE `id` = ?', [getProfile.data.id])
      .then(([rows]) => {
        return {
          success: rows.affectedRows === 1,
          message: 'Profile has been deleted',
        };
      })
      .catch((err) => {
        console.log(err);
        return { success: false, err };
      });
    if (result.update.success && result.delete.success) {
      return { message: 'Profile has been deleted', success: true };
    } else if (!result.update.success) {
      return { message: result.update.err.message, success: result.update.success };
    } else {
      return { message: result.delete.err.message, success: result.delete.success };
    }
  } else {
    console.log('Profile id is wrong');
    return { message: 'Profile id is wrong', wrongProfileID: true };
  }
}

function sendProfileNotFound(getProfile) {
  const errMessage = !getProfile.result ? getProfile.err.message : 'You dont have any profiles yet';
  console.log('No Profile yet');
  return { message: errMessage, noProfile: true };
}

module.exports = { Profile, create, get, update, deleteProfile };
