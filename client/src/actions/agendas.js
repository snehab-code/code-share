import axios from '../config/axios'
import Swal from 'sweetalert2'

const setAgendas = (agendas) => {
    return {type: 'SET_AGENDAS', payload: agendas}
}

const addAgenda = (agenda) => {
    return {type: 'ADD_AGENDA', payload: agenda}
}

const removeAgenda = (id) => {
    return {type: 'REMOVE_AGENDA', payload: id}
}

const updateAgenda = (id, agenda) => {
    return {type: 'UPDATE_AGENDA', payload: {id, agenda}}
}

export const startGetAgendas = () => {
    return (dispatch) => {
        axios.get(`/agendas`)
            .then(response => {
                const agendas = response.data
                dispatch(setAgendas(agendas))
            })
            .catch(err => {
                if (err.response.status==401) {
                    dispatch({type: 'LOGOUT'})
                }
            })
    }
}

export const startPostAgenda = (formData) => {
    return (dispatch) => {
        axios.post('/agendas', formData)
            .then(response => {
                const agenda = response.data
                dispatch(addAgenda(agenda))
                // dispatch()
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while posting your agenda',
                    footer: 'Please try again'
                  })
                if (err.response.status==401) {
                    dispatch({type: 'LOGOUT'})
                }
            })
    }
}

export const startDeleteAgenda = (id) => {
    return (dispatch) => {
        axios.delete(`/agendas/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeAgenda(id))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while posting your agenda',
                    footer: 'Please try again'
                  })
                if (err.response.status==401) {
                    dispatch({type: 'LOGOUT'})
                }
            })
    }
}

export const startPutAgenda = (id, formData) => {
    return (dispatch) => {
        axios.put(`/agendas/${id}`, formData)
            .then(response=>{
                const agenda = response.data
                const id = agenda._id
                dispatch(updateAgenda(id, agenda))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while updating your agenda',
                    footer: 'Please try again'
                  })
                if (err.response.status==401) {
                    dispatch({type: 'LOGOUT'})
                }
            })
    }
}