'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.CHAR(50)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.CHAR(50)
      },
      email: {
        allowNull: true,
        type: Sequelize.CHAR(150)
      },
      gender: {
        allowNull: false,
        type: Sequelize.CHAR(20)
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.CHAR(255)
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
