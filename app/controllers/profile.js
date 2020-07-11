const {
  Profile,
  get: getProfile,
  create: createProfile,
  update: updateProfile,
  deleteProfile,
} = require('../models/profile');

async function get(req, res) {
  const user = req.user;
  const data = await getProfile(user.id);
  if (data.result && data.data !== undefined) {
    res.status(200).send(data.data);
    return;
  } else if (data.data === undefined) {
    res.status(404).send({
      message: 'Profile not found',
    });
  } else {
    res.status(500).send({
      message: data.err || 'Unexpected Error',
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

  const data = await createProfile(profile);

  if (data.insert && data.update.result) {
    res.status(200).send({ msg: 'Profile has been created' });
  } else {
    let errMsg;
    if (!data.result && !data.insert) {
      errMsg = data.message || data.err.message;
    } else if (!data.update.result) {
      errMsg = data.update.err.message;
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

  const result = await updateProfile(profile);
  if (result.unexpectedError) {
    res.status(500).send({ msg: result.err.message });
  } else if (result.noProfile || result.wrongProfileID) {
    res.status(404).send({ msg: result.message });
  } else {
    res.status(200).send({ msg: result.message });
  }
}

async function deleteUserProfile(req, res) {
  const profile = new Profile({
    id: parseInt(req.body.id, 10),
    user_id: req.user.id,
  });
  const result = await deleteProfile(profile);

  if (result.noProfile || result.wrongProfileID) {
    res.status(404).send({ msg: result.message });
  } else if (result.success) {
    res.status(200).send({ msg: result.message });
  } else {
    res.status(500).send({ msg: result.err.message || 'Unexpected Error' });
  }
}

module.exports = { get, create, update, deleteUserProfile };
