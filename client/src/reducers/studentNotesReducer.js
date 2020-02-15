const studentNotesReducer = (state=[], action) => {
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
        default : {
            return state
        }
    }
}

export default studentNotesReducer