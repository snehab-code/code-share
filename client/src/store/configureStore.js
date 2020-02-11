import {createStore, combineReducers} from 'redux'
import batchesReducer from '../reducers/batchesReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        batches: batchesReducer
    }))
    return store
}

export default configureStore