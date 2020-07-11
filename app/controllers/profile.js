const { Profile, get: getProfile, create: createProfile } = require('../models/profile');

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

function update(req, res) {
  const profile = new Profile({
    id: parseInt(req.body.id, 10),
    user_id: req.user.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });
  Profile.update(profile, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Unexpected Error',
      });
    } else {
      res.send(data);
    }
  });
}

function deleteProfile(req, res) {
  const profile = new Profile({
    id: parseInt(req.body.id, 10),
    user_id: req.user.id,
  });
  Profile.delete(profile, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Unexpected Error',
      });
    } else {
      res.send(data);
    }
  });
}

module.exports = { get, create, update, deleteProfile };
