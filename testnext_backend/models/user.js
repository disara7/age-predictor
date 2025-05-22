'use strict';
const bcrypt = require("bcryptjs");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  // Use a beforeSave hook to hash the password only if it has been changed and isn't already hashed
  User.beforeSave(async (user) => {
    // Check if password field is changed
    if (user.changed('password')) {
      // If the new value doesn't start with the bcrypt prefix, hash it
      if (!user.password.startsWith('$2b$')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  return User;
};
