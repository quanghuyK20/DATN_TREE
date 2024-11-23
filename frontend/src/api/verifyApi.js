import axiosClient from './axiosClient'

const verifyApi = {
    getStoresVerify: () => {
        const url = '/api/stores-not-verify'
        return axiosClient.get(url)
    },

    getShippingUnitVerify: () => {
        const url = '/api/shipping-units-not-verify'
        return axiosClient.get(url)
    },

    getShipperVerify: () => {
        const url = '/api/shipper-not-verify'
        return axiosClient.get(url)
    },

    verifyStore: (id) => {
        const url = `/api/stores-verify/${id}`
        return axiosClient.post(url)
    },

    verifyShippingUnit: (id) => {
        const url = `/api/shipping-units-verify/${id}`
        return axiosClient.post(url)
    }

}

export default verifyApi
