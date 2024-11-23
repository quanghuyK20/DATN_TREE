const express = require('express')
const messageController = require('../controllers/api/message.controller')

const router = express.Router();

router.post('/',messageController.createMessage)

router.get("/:conversationId",messageController.getMessageByConversationId)

module.exports = router