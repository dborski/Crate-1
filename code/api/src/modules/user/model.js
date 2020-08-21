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
  // ANNOTATION: This model is telling us that our users table has four columns/attributes: 1. name, 2. email, 3. password, 4. role. (ID does not need to be defined, but it is also an attribute)

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }
  // ANNOTATION: This is defining our relationship to subscriptions in our database. User has a one-to-many relationship with subscriptions.
  // Users has many subscriptions and subscriptions belong to a user. 

  // POSSIBLE ADDITION: Since subscriptions is acting as a joins table, we should probably add the relationship that also exists between users and crates,
  // such as User.hasMany(models.Crate) through subscriptions
  return User
}

// ANNOTATION: From experience, the model is generally a snapshot of how a specific table (in this case the users table) is setup.