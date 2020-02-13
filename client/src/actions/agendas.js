import axios from '../config/axios'

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
                console.log('startgetagendas err', err)
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
                console.log('startPostAgenda err', err)
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
                console.log('startDeleteAgenda err', err)
            })
    }
}

export const startPutAgenda = (id, formData) => {
    return (dispatch) => {
        console.log(id, formData)
        axios.put(`/agendas/${id}`, formData)
            .then(response=>{
                const agenda = response.data
                const id = agenda._id
                dispatch(updateAgenda(id, agenda))
            })
            .catch(err => {
                console.log(err => {
                    console.log('update agenda error', err)
                })
            })
    }
}