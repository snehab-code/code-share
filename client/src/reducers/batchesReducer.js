const batchesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_BATCHES' : {
            return [...action.payload]
        }
        case 'ADD_BATCH': {
            return [...state, action.payload]
        }
        case 'REMOVE_BATCH': {
            return state.filter(batch => batch._id !== action.payload)
        }
        case 'UPDATE_BATCH': {
            return state.map(batch => {
                if (batch._id === action.payload.id) {
                    return {...batch, ...action.payload.batch}
                } else {
                    return {...batch}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default batchesReducer