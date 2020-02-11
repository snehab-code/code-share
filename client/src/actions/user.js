import axios from '../config/axios'
import {startGetBatches} from '../actions/batches'

const loginUser = () => {
    return {type: 'LOGIN_USER'}
}

export const logoutUser = () => {
    return {type: 'LOGOUT_USER'}
}
 
export const startUserLogin = (formData, history) => {
    return (dispatch) => {
        axios.post('/admin/login', formData)
            .then(response => {
                if(response.data.token) {
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    dispatch(loginUser())
                    dispatch(startGetBatches())
                    history.push('/code-admin/batches')
                } else {
                    dispatch(logoutUser())
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startCheckUserAuth = () => {
    return (dispatch) => {
        axios.get('/admin/check-login')
            .then(response => {
                if(response.data.notice == 'valid user') {
                    dispatch(loginUser())
                    dispatch(startGetBatches())
                } else {
                    dispatch(logoutUser())
                    dispatch({type: 'LOGOUT'})
                }
            })
            .catch(err => {
                console.log('startCheckUserAuth error', err)
            })
    }
}