import axiosStudent from '../config/axiosStudent'

const setStudentNotes = (notes) => {
    return {type: 'SET_STUDENT_NOTES', payload: notes}
}

export const addStudentNote = (note) => {
    return {type: 'ADD_STUDENT_NOTE', payload: note}
}

export const removeStudentNote = (id) => {
    return {type: 'REMOVE_STUDENT_NOTE', payload: id}
}

export const updateStudentNote = (id, note) => {
    return {type: 'UPDATE_STUDENT_NOTE', payload: {id, note}}
}

export const clearStudentNotes = () => {
    return {type: 'CLEAR'}
}

export const startGetStudentNotes = (agendaId) => {
    return (dispatch) => {
        axiosStudent.get(`/agendas/${agendaId}/notes`)
            .then(response => {
                const notes = response.data
                dispatch(setStudentNotes(notes))
            })
            .catch(err => {
                // console.log('startGetStudentNotes err', err)
            })
    }
}