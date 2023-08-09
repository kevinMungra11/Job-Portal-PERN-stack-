'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company_Details extends Model {
    static associate({ User, Job_Info }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: {
          name: 'admin_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })

      this.hasOne(Job_Info, {
        foreignKey: {
          name: 'company_info',
          allowNull: false,
          type: DataTypes.UUID
        }
      })
    }
  }
  Company_Details.init({
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
      references: { model: 'User', key: 'id' },
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
    }
  }, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    modelName: 'Company_Details',
  });
  return Company_Details;
};