import {createStore, combineReducers, applyMiddleware} from 'redux'
import batchesReducer from '../reducers/batchesReducer'
import thunk from 'redux-thunk'
import agendasReducer from '../reducers/agendasReducer'
import notesReducer from '../reducers/notesReducer'
import tagsReducer from '../reducers/tagsReducer'
import userReducer from '../reducers/userReducer'
import studentAgendaReducer from '../reducers/studentAgendaReducer'
import studentNotesReducer from '../reducers/studentNotesReducer'

const appReducer = combineReducers({
    batches: batchesReducer,
    agendas: agendasReducer,
    notes: notesReducer,
    tags: tagsReducer,
    user: userReducer,
    studentAgenda: studentAgendaReducer,
    studentNotes: studentNotesReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined 
    }
    return appReducer(state,action)
}

const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}

export default configureStore