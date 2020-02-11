import axios from '../config/axios'

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
        axios.post('/batches')
            .then(response => {
                const batches = response.data
                dispatch(setBatches(batches))
            })
            .catch(err => {
                console.log('startgetnbatches err')
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
                console.log('startPostBatch err', err)
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
                console.log('startDeleteBatch err', err)
            })
    }
}

export const startPutBatch = (id, formData, history) => {
    return (dispatch) => {
        axios.put(`/batches/${id}`, formData)
            .then(response=>{
                const batch = response.data
                const id = batch._id
                dispatch(updateBatch(id, batch))
                history.push('/')
            })
            .catch(err => {
                console.log(err => {
                    console.log('update batch error', err)
                })
            })
    }
}