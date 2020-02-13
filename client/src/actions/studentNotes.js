import axiosStudent from '../config/axiosStudent'

const setStudentNotes = (notes) => {
    return {type: 'SET_STUDENT_NOTES', payload: notes}
}

export const removeStudentNotes = () => {
    return {type: 'REMOVE_STUDENT_NOTES'}
}

export const startGetStudentNotes = (agendaId) => {
    return (dispatch) => {
        axiosStudent.get(`/agendas/${agendaId}/notes`)
            .then(response => {
                const notes = response.data
                dispatch(setStudentNotes(notes))
            })
            .catch(err => {
                console.log('startGetStudentNotes err', err)
            })
    }
}