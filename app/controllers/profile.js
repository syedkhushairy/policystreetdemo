const Profile = require('../models/profile');

exports.get = (req, res) => {
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
};

exports.create = (req, res) => {
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
};

exports.update = (req, res) => {
  const profile = new Profile({
    id: parseInt(req.params.id, 10),
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
};
