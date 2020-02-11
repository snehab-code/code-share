import {createStore, combineReducers, applyMiddleware} from 'redux'
import batchesReducer from '../reducers/batchesReducer'
import thunk from 'redux-thunk'
import agendasReducer from '../reducers/agendasReducer'
import notesReducer from '../reducers/notesReducer'
import userReducer from '../reducers/userReducer'

const appReducer = combineReducers({
    batches: batchesReducer,
    agendas: agendasReducer,
    notes: notesReducer,
    user: userReducer
})

const rootReducer = (state, action) => {
    if (action.type == 'LOGOUT')
    state = undefined 
    return appReducer(state,action)
}

const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}

export default configureStore