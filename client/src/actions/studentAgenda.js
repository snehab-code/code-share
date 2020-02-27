import axiosStudent from '../config/axiosStudent'

const setStudentAgenda = (agenda) => {
    return {type: 'SET_STUDENT_AGENDA', payload: agenda}
}

export const removeStudentAgenda = () => {
    return {type: 'REMOVE_STUDENT_AGENDA'}
}

export const startGetStudentAgenda = (otp, history) => {
    return (dispatch) => {
        axiosStudent.get(`/agendas?otp=${otp}`)
            .then(response => {
                const agenda = response.data
                dispatch(setStudentAgenda(agenda))
                console.log(agenda)
                if (agenda._id) history.push(`/agendas/${agenda._id}`)
            })
            .catch(err => {
                // console.log('startGetStudentAgendas err', err)
            })
    }
}