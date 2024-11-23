import axiosClient from './axiosClient'


const uploadImgApi = {
    uploadUserAvatar:(userId,img) => {
        const url = `/api/upload/avatar/user/${userId}`
        return axiosClient.post(url,img,{
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    },

    uploadProductImg:(productId,img) => {
        const url = `/api/upload/product/${productId}`
        return axiosClient.post(url,img,{
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    },

    uploadFeedbackImg:(feedbackId,img) => {
        const url = `/api/upload/feedback/${feedbackId}`
        return axiosClient.post(url,img,{
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    },

    uploadVoucherImg:(voucherId,img) => {
        const url = `/api/upload/voucher/${voucherId}`
        return axiosClient.post(url,img,{
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    },

    uploadStoreImg: (storeId, img) => {
        const url = `/api/upload/store/${storeId}`
        return axiosClient.post(url,img,{
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    },

    uploadShipperUnitImg: (shipperUnitId, img) => {
        const url = `/upload/shipper-unit/${shipperUnitId}`
        return axiosClient.post(url,img,{
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    }

    
}

export default uploadImgApi