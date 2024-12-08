import axiosClient from './axiosClient'

const roleApi = {
    getRoles: () => {
        const url = '/api/roles'
        return axiosClient.get(url)
    },
    getUserBySeft: () => {
        const url = '/api/user-self'
        return axiosClient.get(url)
    },

    softDeleteById:(id) => {
        const url = `/api/delete-by-admin/${id}`
        return axiosClient.delete(url)
    },

}

export default roleApi
