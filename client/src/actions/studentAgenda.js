import axiosStudent from '../config/axiosStudent'

const setStudentAgenda = (agenda) => {
    return {type: 'SET_STUDENT_AGENDA', payload: agenda}
}

export const removeStudentAgenda = () => {
    return {type: 'REMOVE_STUDENT_AGENDA'}
}

export const startGetStudentAgenda = (otp) => {
    return (dispatch) => {
        axiosStudent.get(`/agendas?otp=${otp}`)
            .then(response => {
                const agenda = response.data
                dispatch(setStudentAgenda(agenda))
            })
            .catch(err => {
                console.log('startGetStudentAgendas err', err)
            })
    }
}