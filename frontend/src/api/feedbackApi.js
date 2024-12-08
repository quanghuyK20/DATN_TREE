import axiosClient from './axiosClient'

const feedbackApi = {
    getAllByAdmin: (params) => {
        let url = '/api/feedbacks-by-admin?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getAllByShop: (params) => {
        let url = '/api/feedbacks-by-shop?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getFeedbackById: (id) => {
        const url = `/api/feedbacks/${id}`
        return axiosClient.get(url)
    },

    getFeedbacksByProductId: (id) =>{
        const url = `/api/feedbacks-by-product_id/${id}`
        return axiosClient.get(url);
    },

    updateById: (id,credentials) => {
        const url = `/api/feedbacks/${id}`
        return axiosClient.patch(url,credentials)
    },

    createNew: (credentials) => {
        const url = `/api/feedbacks`
        return axiosClient.post(url,credentials)
    },

    deleteById:(id) => {
        const url = `/api/feedbacks/${id}`
        return axiosClient.delete(url)
    },

}

export default feedbackApi
