'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Company_Details', {
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
      company_name: {
        allowNull: false,
        type: DataTypes.STRING(200),
        unique: true,
        set(value) {
          this.setDataValue('company_name', value.toLowerCase());
        }
      },
      ceo: {
        allowNull: false,
        type: DataTypes.STRING(200)
      },
      number_of_emplyees: {
        type: DataTypes.INTEGER
      },
      company_address: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      revenue: {
        allowNull: false,
        type: DataTypes.STRING(200)
      },
      headquarter: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      about_company: {
        allowNull: false,
        type: DataTypes.STRING(500),
      },
      official_website: {
        allowNull: false,
        type: DataTypes.STRING(500)
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(500),
        unique: true
      },
      date_of_foundation: {
        allowNull: false,
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('Company_Details');
  }
};