import axios from 'axios'
import { parse, stringify } from 'qs'

const detect = {
    detect: (credentials) => {
        const url = '/detect'
        return  axios.create({
            // baseURL: process.env.REACT_APP_API_URL,
            baseURL: process.env.REACT_APP_FLASK_SERVER_API,
            paramsSerializer: {
                encode: parse,
                serialize: stringify,
            },
        }).post(url, credentials)
    },
}

export default detect
