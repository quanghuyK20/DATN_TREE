const { Op } = require('sequelize')
const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

const include = [
    {
      model: models.users,
      as: 'sender',
      attributes: ['id', 'name', 'email', 'avatar', 'birthday', 'address', 'gender', 'deleted_at'],
    },
    {
      model: models.users,
      as: 'receiver',
      attributes: ['id', 'name', 'email', 'avatar', 'birthday', 'address', 'gender', 'deleted_at'],
    },
];
  

async function show(id) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            sender_id: id,
            receiver_id: id
        }),
    })
    return await models.Conversation.findAll({include: include, where: selection })
}

async function create(newConversation) {
    return await models.Conversation.create(newConversation)
}

async function checkNoExitConversation(sender_id, receiver_id) {
    console.log('====================================');
    console.log(sender_id);
    console.log('====================================');
    const selection = objectCleaner.clean({
        [Op.and]: objectCleaner.clean({
            sender_id: sender_id,
            receiver_id: receiver_id
        }),
    })
  
    const conversations = await models.Conversation.findAll({ where: selection });

    if(conversations && conversations.length === 0){
        return true;
    }

    return false;
}


module.exports = {
    addNewConversation: create,
    getConversationById: show,
    checkNoExitConversation:checkNoExitConversation,
}