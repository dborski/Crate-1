'use strict'

// Subscription
module.exports = function(sequelize, DataTypes) {
  let Subscription = sequelize.define('subscriptions', {
    userId: {
      type: DataTypes.INTEGER
    },
    crateId: {
      type: DataTypes.INTEGER
    }
  })
  // NOTE:jg - a user id with be associated with a crate id.  

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User)
    Subscription.belongsTo(models.Crate)
  }
  // NOTE:jg - defining the relationship between user and crate. 
  // it belongs to both and allows for user and crate to have a relationship with each outher 
 // through the subscription joins table.  

  return Subscription
}

// NOTE:jg - 
// NOTE:jg - 