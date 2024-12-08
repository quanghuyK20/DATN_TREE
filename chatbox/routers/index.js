const conversation = require('./conversations.route')
const message = require('./messages.route')
const user = require('./user.route')

module.exports = {
    conversation: conversation,
    message:message,
    user: user,
}
