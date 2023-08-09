'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_Info extends Model {

    static associate({ User, Job_Application, Company_Details }) {
      this.belongsTo(User, {
        foreignKey: {
          name: 'admin_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      })

      this.belongsTo(Company_Details, {
        foreignKey: {
          name: 'company_info',
          allowNull: false,
          type: DataTypes.UUID
        }
      });

      this.belongsToMany(User, {
        through: Job_Application,
        foreignKey: {
          name: 'job_id',
          type: DataTypes.UUIDV4,
          allowNull: false
        }
      })
    }
  }
  Job_Info.init({
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
    job_designation: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(200),
      unique: true
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
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'Job_Info',
  });
  return Job_Info;
};