import axiosClient from './axiosClient'

const productCartApi = {
    getProductsCart: () => {
        const url = '/api/carts'
        return axiosClient.get(url)
    },
    getProductsCartByUser: () => {
        const url = '/api/carts-by-user_id'
        return axiosClient.get(url)
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

export default productCartApi
