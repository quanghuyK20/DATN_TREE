import axiosClient from './axiosClient'

const voucherApi = {
    getAllByAdmin: (params) => {
        let url = '/api/vouchers-by-admin?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getAllByShop: (params) => {
        let url = '/api/vouchers-by-shop?'
        for (let key in params) {
            if (params[key] !== null) url += `${key}=${params[key]}&`
        }
        return axiosClient.get(url)
    },
    getVoucherByStoreId: (id) => {
        let url = `api/vouchers/${id}`;
        return axiosClient.get(url);
    },

    updateById: (id,credentials) => {
        const url = `/api/vouchers/${id}`
        return axiosClient.patch(url,credentials)
    },

    createNew: (credentials) => {
        const url = `/api/vouchers`
        return axiosClient.post(url,credentials)
    },

    deleteById:(id) => {
        const url = `/api/vouchers/${id}`
        return axiosClient.delete(url)
    },

}

export default voucherApi
