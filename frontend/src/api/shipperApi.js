import axiosClient from './axiosClient'

const shipperApi = {
    
    getShipperByAdmin:(params) => {
        let url = '/api/shippers?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },

    getShipperByShippingUnit: (stationId) => {
        const url = `/api/shippers-by-shipping-unit/${stationId}`
        return axiosClient.get(url)
    },

    createNew: (credentials) => {
        const url = '/api/shippers'
        return axiosClient.post(url,credentials)
    },

}

export default shipperApi
