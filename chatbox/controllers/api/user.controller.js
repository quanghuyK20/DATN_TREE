const models = require(process.cwd() + '/models/index')
const { request, response } = require('../../app');
const {
    getUserById
} = require('../CRUD/user')

const getUserBySenderId = async (request, response) => {
    try{
        const userId = request.params.id;
        console.log("userId",userId);
        const user = await getUserById(userId)
        return response.status(200).json(user)
    }catch(err){
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err.toString(),
        })
    }
}


module.exports = {
    getUserById:getUserBySenderId
}