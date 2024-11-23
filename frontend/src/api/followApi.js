import axiosClient from './axiosClient'

const followApi = {

    getFollowByUserId: () => {
        const url = '/api/follow-by-user-id'
        return axiosClient.get(url)
    },

    createNew: (credentials) => {
        const url = `/api/follows`
        return axiosClient.post(url,credentials)
    },

    deleteFollow:(credentials) => {
        const url = `/api/follows-destroy`
        return axiosClient.delete(url,credentials)
    },

    //chat
    getFriends: (id) => {
        const url = `/api/follows-by-user-id/${id}`
        return axiosClient.get(url);
    }

}

export default followApi
