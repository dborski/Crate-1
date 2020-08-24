'use strict'

// Product
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  })
}

// ANNOTATION: This is our product model. Its telling us that it has 6 datatypes. These datatypes are name, slug, description,
// type, gender, image.


// NOTE:jg - For the survey we would probably want to add a column that gives the article of clothing a style classification. (Will need to figure out how to do migrations)
// NOTE:jg - gothFarmer = 1, preppy = 2 etc. 
// NOTE:jg - will this need a new column that assocates a product with a crate? 
// NOTE:jg - Maybe a belongs to assocation?