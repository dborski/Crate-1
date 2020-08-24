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

// ANNOTATION:jg - sets the relationship to the subscription table. Allows it to have a many to many relationship with user. 
// question? Are the multiple styles of crates? that would make sense with a many to many relationship. 
// NOTE:jg - Will need a has many products assocation to. 
// NOTE:jg - each crate will be comprised of many product objects with a certain style value
// NOTE:jg - do we set the style value to the subscription/crate or user? Pros and cons to both.