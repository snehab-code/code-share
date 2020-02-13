const studentNotesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_STUDENT_NOTES': {
            return [...action.payload]
        }
        case 'REMOVE_STUDENT_NOTES': {
            return []
        }
        default : {
            return state
        }
    }
}

export default studentNotesReducer