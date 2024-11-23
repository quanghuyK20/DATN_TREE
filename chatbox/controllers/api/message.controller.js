const models = require(process.cwd() + '/models/index')
const { request, response } = require('../../app');
const {
    addNewMessage,
    getMessageById
} = require('../CRUD/message')

const getMessageByConversationId = async (request, response) => {
    try{
        const conversationId = request.params.conversationId;
        const conversation = await getMessageById(conversationId)
        return response.status(200).json(conversation)
    }catch(err){
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err.toString(),
        })
    }
}


const createMessage = async (request, response) => {
    try{
        let newConversation = {
            conversation_id : Number.parseInt(request.body.conversation_id),
            sender: Number.parseInt(request.body.sender),
            text: request.body.text
        }
        const newMessage = await addNewMessage(newConversation)
        return response.status(201).json(newMessage)
    }catch(err){
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err.toString(),
        })
    }

}

module.exports = {
    createMessage: createMessage,
    getMessageByConversationId:getMessageByConversationId
}