'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(150)
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING(20)
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
        type: Sequelize.STRING(255)
      },
      verificationCode: {
        type: Sequelize.STRING(6)
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
