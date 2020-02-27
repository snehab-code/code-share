const studentNotesReducer = (state=[{isLoading: true}], action) => {
    switch(action.type) {
        case 'SET_STUDENT_NOTES': {
            return [...action.payload]
        }
        case 'ADD_STUDENT_NOTE': {
            return [action.payload,...state]
        }
        case 'REMOVE_STUDENT_NOTE': {
            return state.filter(note => note._id !== action.payload)
        }
        case 'UPDATE_STUDENT_NOTE': {
            return state.map(note => {
                if(note._id === action.payload.id) {
                    return {...note, ...action.payload.note}
                } else {
                    return {...note}
                }
            })
        }
        case 'CLEAR': {
            return [{isLoading: true}]
        }
        default : {
            return state
        }
    }
}

export default studentNotesReducer