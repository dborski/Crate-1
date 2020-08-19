module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('crates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('crates');
  }
}

// Annotation: Here is the migration for a Crate. It has the attributes of id, name, description, createdAt, updatedAt. 
// 'down' is there if the migration ever needs to be reversed.