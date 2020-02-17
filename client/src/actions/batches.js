import axios from '../config/axios'
import Swal from 'sweetalert2'

const setBatches = (batches) => {
    return {type: 'SET_BATCHES', payload: batches}
}

const addBatch = (batch) => {
    return {type: 'ADD_BATCH', payload: batch}
}

const removeBatch = (id) => {
    return {type: 'REMOVE_BATCH', payload: id}
}

const updateBatch = (id, batch) => {
    return {type: 'UPDATE_BATCH', payload: {id, batch}}
}

export const startGetBatches = () => {
    return (dispatch) => {
        axios.get('/batches')
            .then(response => {
                const batches = response.data
                dispatch(setBatches(batches))
            })
            .catch(err => {
                // console.log('startgetnbatches err')
            })
    }
}

export const startPostBatch = (formData) => {
    return (dispatch) => {
        axios.post('/batches', formData)
            .then(response => {
                const batch = response.data
                dispatch(addBatch(batch))
                // dispatch()
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while posting your batch',
                    footer: 'Please try again'
                  })
            })
    }
}

export const startDeleteBatch = (id) => {
    return (dispatch) => {
        axios.delete(`/batches/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeBatch(id))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while deleting your batch',
                    footer: 'Please try again'
                  })
            })
    }
}

export const startPutBatch = (formData, id) => {
    return (dispatch) => {
        axios.put(`/batches/${id}`, formData)
            .then(response=>{
                const batch = response.data
                const id = batch._id
                dispatch(updateBatch(id, batch))
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'There was an error while updating your batch',
                    footer: 'Please try again'
                  })
            })
    }
}