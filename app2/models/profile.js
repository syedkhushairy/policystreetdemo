'use strict';
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        timestamps: false
    });
    return Profile;
};

// TODO: createdAt, updatedAt column
// TODO: create migration file
// TODO: learn to foreign keys/relationship using sequelize