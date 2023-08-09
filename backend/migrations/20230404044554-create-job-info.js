'use strict';

// const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Job_Infos', {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true
      },
      admin_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: 'Users', key: 'id' },
        onDelete: "CASCADE"
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: true
      },
      job_designation: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      salary_and_benefits: {
        allowNull: false,
        type: DataTypes.STRING(200),
      },
      application_instruction: {
        allowNull: false,
        type: DataTypes.STRING(200),
      },
      company_info: {
        allowNull: false,
        type: DataTypes.UUID,
        references: { model: 'Company_Details', key: 'id' },
        onDelete: "CASCADE"
      },
      job_type: {
        allowNull: false,
        type: DataTypes.ENUM('Part time', 'Full time', 'Contract based'),
      },
      experience_level: {
        allowNull: false,
        type: DataTypes.STRING(200),
      },
      educational_requirement: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      skills_requirement: {
        allowNull: false,
        type: DataTypes.STRING(100),
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
    await queryInterface.dropTable('Job_Infos');
  }
};