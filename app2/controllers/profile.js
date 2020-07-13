const Profiles = require('../models').Profile;

module.exports = {
    list(req, res) {
        return Profiles
            .findAll()
            .then(profiles => res.status(200).send(profiles))
            .catch(error => res.status(400).send(error));
    }

    // other resources
};