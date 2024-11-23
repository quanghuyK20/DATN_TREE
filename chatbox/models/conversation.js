'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.belongsTo(models.users, { foreignKey: 'sender_id', as: 'sender' });
      Conversation.belongsTo(models.users, { foreignKey: 'receiver_id', as: 'receiver' });
    }
  }

  Conversation.init({
    sender_id: DataTypes.TINYINT,
    receiver_id: DataTypes.TINYINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Conversation',
  });

  return Conversation;
};