import axiosClient from './axiosClient'

const shippingUnitApi = {
    getAll: () => {
        const url = '/api/shipping-units-by-home'
        return axiosClient.get(url)
    },

    getShippingUnitByAdmin: () => {
        const url = '/api/shipping-units'
        return axiosClient.get(url)
    },

    createShippingUnit: (credentials) => {
        const url = '/api/shipping-units'
        return axiosClient.get(url,credentials)
    },

}

export default shippingUnitApi
