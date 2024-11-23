import axios from 'axios'
import { parse, stringify } from 'qs'
const token = localStorage.getItem('token')


const nodeJSClient = axios.create({
    baseURL: process.env.REACT_APP_MESSENGER,
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
    nodeJSClient.defaults.headers.common[
        'Authorization'
    ] = `Bearer ${token}`
}

export default nodeJSClient
