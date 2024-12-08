import axiosClient from './axiosClient'

const userVoucherApi = {
    getVoucherByUserId: () => {
        const url =  `/api/user-vouchers-by-user`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/user-vouchers`
        return axiosClient.post(url,credentials)
    },

}

export default userVoucherApi
