const express = require('express')
const userController = require('../controllers/api/user.controller')

const router = express.Router();


router.get('/:id',userController.getUserById)

module.exports = router