import axios from '../config/axios'
import {addTags} from './tags'

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

export const startGetNotes = () => {
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
    return (dispatch, getState) => {
        const newTags = formData.tags.filter(tag => tag.__isNew__).map(tag => ({name: tag.label}))
        axios.post('/tags', newTags)
            .then(response => {
                dispatch(addTags(response.data))
                const newTags = response.data.map(tag => tag._id)
                const oldTags = formData.tags.filter(tag => !tag.__isNew__).map(tag => tag.value)
                if (newTags.length > 0 && oldTags.length > 0) {   
                    formData.tags = [...newTags, ...oldTags]
                } else if (newTags.length > 0) {
                    formData.tags = newTags
                } else {
                    formData.tags = oldTags
                }
                axios.post('/notes', formData)
                .then(response => {
                    const note = response.data
                    note.agenda = {
                        _id: agendaId,
                        batch: batchId
                    }

                    const tags = getState().tags
                    const noteTags = note.tags.map(tag => {
                        const find = tags.find(storeTag => tag == storeTag._id)
                        if (find) {
                            return {
                                name: find.name,
                                _id: find._id
                            }
                        } 
                    })
                    note.tags = noteTags
                    
                    dispatch(addNote(note))
                    history.push(`/code-admin/batches/${batchId}/agendas/${agendaId}/notes`)
                })
                .catch(err => {
                    console.log('startPostNote err', err)
                })
            })
            .catch(err => {
                console.log('tag posting error')
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
    return (dispatch, getState) => {
        const newTags = formData.tags.filter(tag => tag.__isNew__).map(tag => ({name: tag.label}))
        axios.post('/tags', newTags)
            .then(response => {
                dispatch(addTags(response.data))
                const newTags = response.data.map(tag => tag._id)
                const oldTags = formData.tags.filter(tag => !tag.__isNew__).map(tag => tag.value)
                if (newTags.length > 0 && oldTags.length > 0) {   
                    formData.tags = [...newTags, ...oldTags]
                } else if (newTags.length > 0) {
                    formData.tags = newTags
                } else {
                    formData.tags = oldTags
                }
                axios.put(`/notes/${id}`, formData)
                    .then(response=>{
                        const note = response.data
                        note.agenda = {
                            _id: agendaId,
                            batch: batchId
                        }
                        const tags = getState().tags
                        const noteTags = note.tags.map(tag => {
                            const find = tags.find(storeTag => tag == storeTag._id)
                            if (find) {
                                return {
                                    name: find.name,
                                    _id: find._id
                                }
                            }
                        })
                        note.tags = noteTags
                        const id = note._id
                        dispatch(updateNote(id, note))
                        history.push(`/code-admin/batches/${batchId}/agendas/${agendaId}/notes`)
                    })
                    .catch(err => {
                        console.log('update note error', err)
                    })
            })
            .catch(err => {
                console.log('update note, tag post error', err)
            })
    }
}