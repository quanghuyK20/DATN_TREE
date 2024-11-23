import axiosClient from './axiosClient'

const orderReceiverApi = {    
    getAllByOwnerId: (id) => {
        let url = `/api/order-receivers-by-user_id/${id}`
        return axiosClient.get(url)
    },

    createNew:(credentials) => {
        const url = '/api/order-receivers'
        return axiosClient.post(url,credentials)
    },
}

export default orderReceiverApi
