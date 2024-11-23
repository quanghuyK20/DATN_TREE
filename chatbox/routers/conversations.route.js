const express = require('express')
const conversationController = require('../controllers/api/conversation.controller')

const router = express.Router();

router.post('/',conversationController.createConversation)

router.get('/:id',conversationController.getConversationBySenderId)

module.exports = router