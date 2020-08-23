'use strict'

module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
  }

  return Crate
}

// Here is our model. Its telling us that our Crate model has two attributes of name (String) and description (Text).
// Lines 13 - 15 are telling us that Crate has many Subscriptions

// NOTE Might need to create a migration for a one to many relationship with Products 