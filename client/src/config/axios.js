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
        "x-auth": localStorage.getItem('token')
    }
})

axios.interceptors.request.use(config => {
    config.headers['x-auth'] = localStorage.getItem('token')
    return config
})


export default axios