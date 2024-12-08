import axiosClient from './axiosClient'

const mailApi = {

    sendMailOrder: (credentials) => {
        const url = `/api/mail-order`
        return axiosClient.post(url,credentials)
    },

    verifyMail: (credentials) => {
        const url = `/api/mail-verify`
        return axiosClient.post(url,credentials)
    },

    registerMail: (credentials) => {
        const url = `/api/mail-register`
        return axiosClient.post(url,credentials)
    }
}

export default mailApi
