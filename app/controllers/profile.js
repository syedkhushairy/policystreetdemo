const {
  Profile,
  get: getProfile,
  create: createProfile,
  update: updateProfile,
  deleteProfile,
} = require('../models/profile');

async function get(req, res) {
  const user = req.user;
  const { success, data, err } = await getProfile(user.id);
  if (success && data !== undefined) {
    res.status(200).send(data);
    return;
  } else if (data === undefined) {
    res.status(404).send({
      message: 'Profile not found',
    });
  } else {
    res.status(500).send({
      message: err.message || 'Unexpected Error',
    });
  }
}

async function create(req, res) {
  const profile = new Profile({
    user_id: req.user.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });

  const { update, insert, error } = await createProfile(profile);

  if (insert && update.success) {
    res.status(200).send({ msg: 'Profile has been created' });
  } else {
    let errMsg;
    if (error && !insert) {
      errMsg = message || error.message;
    } else if (!update.result) {
      errMsg = update.err.message;
    }
    res.status(500).send({
      message: errMsg || 'Unexpected Error',
    });
  }
}

async function update(req, res) {
  const profile = new Profile({
    id: parseInt(req.body.id, 10),
    user_id: req.user.id,
    first_name: req.body.first_name ? req.body.first_name.trim() : undefined,
    last_name: req.body.last_name ? req.body.last_name.trim() : undefined,
    email: req.body.email,
  });

  const { noProfile, wrongProfileID, message, unexpectedError, err } = await updateProfile(profile);

  if (unexpectedError) {
    res.status(500).send({ message: err.message });
  } else if (noProfile || wrongProfileID) {
    res.status(404).send({ message: message });
  } else {
    res.status(200).send({ message: message });
  }
}

async function deleteUserProfile(req, res) {
  const profile = new Profile({
    id: parseInt(req.body.id, 10),
    user_id: req.user.id,
  });
  const { noProfile, wrongProfileID, success, message } = await deleteProfile(profile);

  if (noProfile || wrongProfileID) {
    res.status(404).send({ message: message });
  } else if (success) {
    res.status(200).send({ message: message });
  } else {
    res.status(500).send({ message: message || 'Unexpected Error' });
  }
}

module.exports = { get, create, update, deleteUserProfile };
