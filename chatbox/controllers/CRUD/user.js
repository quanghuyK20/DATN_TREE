const { Op } = require('sequelize')
const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

async function show(id) {
    return await models.users.findAll({ where: { id: id }});
}


module.exports = {
    getUserById: show,
}
