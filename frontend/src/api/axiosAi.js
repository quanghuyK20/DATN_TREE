import axios from 'axios'
import { parse, stringify } from 'qs'
const token = localStorage.getItem('token')


const axiosAi = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: "http://localhost:5000/",
    // headers: {
    //     'content-type': 'application/json',
    // },
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
})
if(token !== null){
    axiosAi.defaults.headers.common[
        'Authorization'
    ] = `Bearer ${token}`
}

export default axiosAi
