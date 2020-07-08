const Profile = require('../models/profile');

function get(req, res) {
  const user = req.user;
  Profile.get(user.id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Unexpected Error',
      });
    } else {
      if (data === undefined) {
        res.status(404).send({
          message: 'Profile not found',
        });
      } else {
        res.send(data);
      }
    }
  });
}

function create(req, res) {
  const profile = new Profile({
    user_id: req.user.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });

  Profile.create(profile, (err, data) => {
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
