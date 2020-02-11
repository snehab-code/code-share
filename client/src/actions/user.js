import axios from '../config/axios'
import {startGetBatches} from '../actions/batches'

const loginUser = (notice) => {
    return {type: 'LOGIN_USER'}
}

export const startUserLogin = (formData) => {
    return (dispatch) => {
        axios.post('/admin/login', formData)
            .then(response => {
                if(response.data.token) {
                    token = response.data
                    localStorage.setItem('token', token)
                    dispatch(loginUser())
                    dispatch(startGetBatches())
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startCheckUserAuth = () => {
    return (dispatch) => {
        axios.get('admin/check-login')
            .then(response => {
                if(response.data.notice == 'valid user') {
                    dispatch(loginUser())
                    dispatch(startGetBatches())
                }
            })
            .catch(err => {
                console.log('startCheckUserAuth error', err)
            })
    }
}