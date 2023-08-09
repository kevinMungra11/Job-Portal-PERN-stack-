'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job_Application extends Model {
    static associate(models) {

    }
  }
  Job_Application.init({
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: { model: 'User', key: 'id' },
      primaryKey: true,
      onDelete: "CASCADE"
    },
    job_id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      references: { model: 'Job_Info', key: 'id' },
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
    }
  }, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    modelName: 'Job_Application',
  });
  return Job_Application;
};