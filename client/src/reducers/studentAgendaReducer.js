const studentAgendaReducer = (state={}, action) => {
    switch(action.type) {
        case 'SET_STUDENT_AGENDA' : {
            return {...action.payload}
        }
        case 'REMOVE_STUDENT_AGENDA': {
            return {}
        }
        default : {
            return state
        }
    }
}

export default studentAgendaReducer