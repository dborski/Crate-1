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
  // NOTE:jg - sets the relaitonship to the subscription table. Allows it to have a many to many relationship with user. 
  // question? Are the multiple styles of crates? that would make sense with a many to many relationship. 

  return Crate
}

// NOTE:jg - Will need a has many products assocation to. 
// NOTE:jg - each crate will be comprised of many product objects with a certain style value
// NOTE:jg - do we set the style value to the subscription/crate or user? Pros and cons to both. 