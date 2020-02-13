import Axios from 'axios'

let url 
if (!window.location.href.includes('localhost')) {
    url = '/api'
} else {
    url = 'http://localhost:3010/api'
}

const axiosStudent = Axios.create({
    baseURL: url
})

export default axiosStudent