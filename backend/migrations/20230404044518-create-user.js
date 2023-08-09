'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      user_name: {
        allowNull: false,
        type: DataTypes.STRING(50),
        unique: true
      },
      is_admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      bio: {
        allowNull: true,
        type: DataTypes.STRING(500)
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING(100)
      },
      gender: {
        allowNull: true,
        type: DataTypes.STRING(10)
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      is_signedIn: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};