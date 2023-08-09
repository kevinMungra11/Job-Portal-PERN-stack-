'use strict';
const {
  Model
} = require('sequelize');


const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Job_Info, Job_Application, Company_Details }) {
      this.hasMany(Job_Info, {
        as: 'admin',
        foreignKey: {
          name: 'admin_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      });

      this.hasMany(Company_Details, {
        as: 'company_admin',
        foreignKey: {
          name: 'admin_id',
          allowNull: false,
          type: DataTypes.UUID
        }
      });

      this.belongsToMany(Job_Info, {
        through: Job_Application,
        foreignKey: {
          name: 'user_id',
          type: DataTypes.UUID,
          allowNull: false
        }
      });
    }
  }
  User.init({
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
      unique: true,
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
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100),
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      }
    },
    is_signedIn: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'User',
  });
  return User;
};