const { Op } = require('sequelize')
const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')
const include = [
    {
        model: models.users,
        attributes: ['name','email','avatar','birthday','address','gender','deleted_at'],
        required: true,
    },
]

async function create(newMessage) {
    return await models.Message.create(newMessage)
}

async function show(id) {
    return await models.Message.findAll({include: include, where: { conversation_id: id } });
}


module.exports = {
    addNewMessage: create,
    getMessageById: show,
}
