'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasOne(models.Message, { foreignKey: 'sender' })
      users.hasOne(models.Conversation, { foreignKey: 'sender_id' })
      users.hasOne(models.Conversation, { foreignKey: 'receiver_id' })
    }
  }
  users.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      email_verified_at: DataTypes.DATE,
      role_id:DataTypes.TINYINT,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      birthday: DataTypes.DATE,
      address : DataTypes.STRING,
      phone_number : DataTypes.STRING,
      gender : DataTypes.TINYINT,
      deleted_at : DataTypes.TINYINT,
      remember_token : DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};