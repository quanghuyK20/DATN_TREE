const models = require(process.cwd() + '/models/index')
const {
    addNewConversation,
    getConversationById,
    checkNoExitConversation,
} = require('../CRUD/conversation')

const {
    getUserById
} = require('../CRUD/user')

const getConversationBySenderId = async (request, response) => {
    try{
        const conversationId = request.params.id;
        const conversation = await getConversationById(conversationId)
        return response.status(200).json(conversation)  
    }catch(err){
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err.toString(),
        })
    }
}



const createConversation = async (request, response) => {
    try{
        let newConversation = {
            sender_id : Number.parseInt(request.body.sender_id),
            receiver_id: Number.parseInt(request.body.receiver_id),
        }
        if(checkNoExitConversation(newConversation.sender_id,newConversation.receiver_id) === true){
            await addNewConversation(newConversation)
            return response.status(201).json("create success!")
        }else{
            return response.status(400).json("Conversation already exists!")
        }
    }catch(err){
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err.toString(),
        })
    }

}

module.exports = {
    createConversation: createConversation,
    getConversationBySenderId:getConversationBySenderId
}