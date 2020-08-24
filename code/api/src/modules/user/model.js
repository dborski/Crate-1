'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })
// NOTE:jg - We will probably need to add a style prefernce column.
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}

// NOTE:jg - If style value is 'nil' user has to take survey to figure out style. 
// NOTE:jg - Do we create a survey folder with its own model etc.. 
// NOTE:jg - Could we use 