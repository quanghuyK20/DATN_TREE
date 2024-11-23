import axios from 'axios'
import { parse, stringify } from 'qs'
const token = localStorage.getItem('token')


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
        // 'content-type': 'multipart/form-data'
    },
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
})
if(token !== null){
    axiosClient.defaults.headers.common[
        'Authorization'
    ] = `Bearer ${token}`
}

export default axiosClient
