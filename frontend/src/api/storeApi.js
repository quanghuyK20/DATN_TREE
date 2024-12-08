import axiosClient from './axiosClient'

const storeApi = {
    getStores: () => {
        const url = '/api/stores'
        return axiosClient.get(url)
    },
    
    getStoreByAdmin: (params) => {
        let url = '/api/stores-by-admin?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },

    getProductsCartByUser: () => {
        const url = '/api/carts-by-user_id'
        return axiosClient.get(url)
    },
    getStoreInfoById:(id) => {
        const url = `/api/stores/info/${id}`
        return axiosClient.get(url)
    },
    getStoreByOwnerId:(id) => {
        const url = `/api/stores/owner/${id}`
        return axiosClient.get(url)
    },
    createNew:(credentials) => {
        const url = '/api/stores'
        return axiosClient.post(url,credentials)
    },
    addProductToCart:(credentials) => {
        const url = '/api/add-product-carts'
        return axiosClient.post(url,credentials)
    },
    updateAmountProductToCart:(credentials) => {
        const url = '/api/update-amount-product'
        return axiosClient.patch(url,credentials)
    },
    deleteProductByCart:(id) => {
        const url = `/api/delete-product-carts/${id}`
        return axiosClient.delete(url)
    },

}

export default storeApi
