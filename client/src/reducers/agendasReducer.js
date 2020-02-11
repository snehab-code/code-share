const agendasReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_AGENDAS' : {
            return [...action.payload]
        }
        case 'ADD_AGENDA': {
            return [...state, action.payload]
        }
        case 'REMOVE_AGENDA': {
            return state.filter(agenda => agenda._id !== action.payload)
        }
        case 'UPDATE_AGENDA': {
            return state.map(agenda => {
                if (agenda._id === action.payload.id) {
                    return {...agenda, ...action.payload.agenda}
                } else {
                    return {...agenda}
                }
            })
        }
        default: {
            return state
        }
    }
}

export default agendasReducer