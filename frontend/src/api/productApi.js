import axiosClient from './axiosClient'

const productApi = {
    getProducts: () => {
        const url = '/api/products'
        return axiosClient.get(url)
    },
    
    getAllByAdmin: (params) => {
        let url = '/api/products-by-admin?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },

    getProductsByParams:(txt_search) => {
        let url = `/api/products-by-params?txt_search=${txt_search}`
        console.log("url", url);
        return axiosClient.get(url)
    },

    getProductById: (id) => {
        const url = `/api/products/${id}`
        return axiosClient.get(url)
    },

    getProductsSold: () => {
        const url = '/api/products-sold'
        return axiosClient.get(url)
    },
    
    getProductByCategory: (credentials) => {
        const url = '/api/product-categories/getByName'
        return axiosClient.post(url, credentials)
    },

    getProductByStoreId:(id) => {
        const url = `api/products-store_id/${id}`
        return axiosClient.get(url);
    },

    createNew: (credentials) => {
        const url = '/api/products'
        return axiosClient.post(url, credentials)
    },

    updateById: (id,credentials) => {
        const url = `/api/products/${id}`
        return axiosClient.patch(url, credentials)
    },

    softDeleteById:(id) => {
        const url = `/api/products/delete-by-admin/${id}`
        return axiosClient.delete(url)
    },

    deleteProductByOwner:(id) => {
        const url = `/api/delete-product-by-owner/${id}`
        return axiosClient.delete(url)
    },

}

export default productApi
