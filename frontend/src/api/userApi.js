import axiosClient from './axiosClient'

const userApi = {
    getUsers: (params) => {
        let url = '/api/users?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getOneById: (id) => {
        const url = `/api/users/${id}`
        return axiosClient.get(url)
    },

    createNew: (credentials) => {
        const url = '/api/users'
        return axiosClient.post(url, credentials)
    },

    updateById: (id,credentials) => {
        const url = `/api/users/${id}`
        return axiosClient.patch(url, credentials)
    },

    softDeleteById:(id) => {
        const url = `/api/users/delete-by-admin/${id}`
        return axiosClient.delete(url)
    },

    //chat
    getUserChatById: (id) => {
        const url = `/api/users/${id}`
        return axiosClient.get(url);
    }

}

export default userApi
