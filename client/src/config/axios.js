import Axios from 'axios'

let url 
if (!window.location.href.includes('localhost')) {
    url = '/api'
} else {
    url = 'http://localhost:3010/api'
}

const axios = Axios.create({
    baseURL: url,
    headers: {
        "x-auth": localStorage.getItem('authToken')
    }
})

axios.interceptors.request.use(config => {
    config.headers['x-auth'] = localStorage.getItem('authToken')
    return config
})

export default axios