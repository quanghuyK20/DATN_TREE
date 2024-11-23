import axiosClient from './axiosClient'

const orderApi = {    
    getAllByAdmin: (params) => {
        let url = '/api/orders-by-admin?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },

    getAllByShop: (params) => {
        let url = '/api/orders-by-seller?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },

    getAllByShippingUnit: (params) => {
        let url = '/api/orders-by-shipping-unit?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },

    getAllByShipper: (params) => {
        let url = '/api/orders-by-shipper?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    }, 

    getProductsOrdersByUser: () => {
        let url = '/api/products-orders'
        return axiosClient.get(url)
    },

    createOrder: (credentials) =>{
        let url = '/api/orders'
        return axiosClient.post(url,credentials)
    },

    updateOrderByShippingUnit: (orderId, credentials) => {
        let url = `/api/order-update-by-shipping-unit/${orderId}`
        return axiosClient.patch(url,credentials)
    },

    updateOrderByShipper: (orderId, credentials) => {
        let url = `/api/order-update-by-shipper/${orderId}`
        return axiosClient.patch(url, credentials)
    },

    updateOrderByShop: (orderId, credentials) => {
        let url = `/api/order-update-by-seller/${orderId}`
        return axiosClient.patch(url, credentials)
    }

}

export default orderApi
