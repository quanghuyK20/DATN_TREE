'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.users, {foreignKey: 'sender'})
    }
  }
  Message.init({
    conversation_id: DataTypes.TINYINT,
    sender: DataTypes.TINYINT,
    text: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};