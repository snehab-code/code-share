const tagsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_TAGS' : {
            return [...action.payload]
        }
        case 'ADD_TAG': {
            return [action.payload, ...state]
        }
        case 'ADD_TAGS': {
            return [...action.payload, ...state]
        }
        case 'REMOVE_TAG': {
            return state.filter(tag => tag._id !== action.payload)
        }
        case 'UPDATE_TAG': {
            return state.map(tag => {
                if (tag._id === action.payload.id) {
                    return {...tag, ...action.payload.tag}
                } else {
                    return {...tag}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default tagsReducer