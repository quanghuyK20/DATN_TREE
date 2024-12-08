import axiosClient from './axiosClient'

const productCategoryApi = {
    getProductCategories: () => {
        const url = '/api/product-categories'
        return axiosClient.get(url)
    },
}

export default productCategoryApi
