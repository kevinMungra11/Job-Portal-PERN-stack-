'use strict';

// const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Job_Applications', {
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: 'Users', key: 'id' },
        primaryKey: true,
        onDelete: "CASCADE"
      },
      job_id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        references: { model: 'Job_Infos', key: 'id' },
        onDelete: "CASCADE"
      },
      status: {
        allowNull: true,
        type: DataTypes.ENUM('Pending', 'Accepted', 'Denied'),
        defaultValue: "Pending"
      },
      work_experience: {
        allowNull: false,
        type: DataTypes.STRING(200),
      },
      skills: {
        allowNull: false,
        type: DataTypes.STRING(200),
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
    await queryInterface.dropTable('Job_Applications');
  }
};