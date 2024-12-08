import nodeJSClient from './nodeJSClient'

const messageNodeApi = {
    // getUsers: (params) => {
    //     let url = '/api/users?'
    //     for (let key in params) {
    //         if (params[key] !== null) url += `${key}=${params[key]}&`
    //     }
    //     return axiosClient.get(url)
    // },
    // getOneById: (id) => {
    //     const url = `/api/users/${id}`
    //     return axiosClient.get(url)
    // },

    createNewConversation: (credentials) => {
        const url = '/api/conversations'
        return nodeJSClient.post(url, credentials)
    },

    createNewMessage: (credentials) => {
        const url = '/api/messages'
        return nodeJSClient.post(url, credentials)
    },

    getConversationById: (id) => {
        const url = `/api/conversations/${id}`
        return nodeJSClient.get(url)
    },

    getMessageById: (id) => {
        const url = `/api/messages/${id}`
        return nodeJSClient.get(url)
    }

    // updateById: (id,credentials) => {
    //     const url = `/api/users/${id}`
    //     return axiosClient.patch(url, credentials)
    // },

    // softDeleteById:(id) => {
    //     const url = `/api/users/delete-by-admin/${id}`
    //     return axiosClient.delete(url)
    // },

}

export default messageNodeApi
