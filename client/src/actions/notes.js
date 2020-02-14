import axios from '../config/axios'

const setNotes = (notes) => {
    return {type: 'SET_NOTES', payload: notes}
}

const addNote = (note) => {
    return {type: 'ADD_NOTE', payload: note}
}

const removeNote = (id) => {
    return {type: 'REMOVE_NOTE', payload: id}
}

const updateNote = (id, note) => {
    return {type: 'UPDATE_NOTE', payload: {id, note}} 
}

export const startGetNotes = (token) => {
    return (dispatch) => {
        axios.get('/notes')
            .then(response => {
                const notes = response.data
                dispatch(setNotes(notes))
            })
            .catch(err => {
                console.log('startGetNotes err', err)
            })
    }
}

export const startPostNote = (formData, history, batchId, agendaId) => {
    return (dispatch) => {
        axios.post('/notes', formData)
            .then(response => {
                const note = response.data
                note.agenda = {
                    _id: agendaId,
                    batch: batchId
                }
                dispatch(addNote(note))
                history.push(`/code-admin/batches/${batchId}/agendas/${agendaId}`)
            })
            .catch(err => {
                console.log('startPostNote err', err)
            })
    }
}

export const startDeleteNote = (id) => {
    return (dispatch) => {
        axios.delete(`/notes/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeNote(id))
            })
            .catch(err => {
                console.log('startDeleteNote err', err)
            })
    }
}

export const startPutNote = (id, formData, history, batchId, agendaId) => {
    return (dispatch) => {
        axios.put(`/notes/${id}`, formData)
            .then(response=>{
                const note = response.data
                note.agenda = {
                    _id: agendaId,
                    batch: batchId
                }
                const id = note._id
                dispatch(updateNote(id, note))
                history.push(`/code-admin/batches/${batchId}/agendas/${agendaId}`)
            })
            .catch(err => {
                console.log(err => {
                    console.log('update note error', err)
                })
            })
    }
}