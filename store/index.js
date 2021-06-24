import {createStore,combineReducers,applyMiddleware} from 'redux'
import boardReducer from './reducers/boardReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({boardReducer})
const store = createStore(reducers,applyMiddleware(thunk))

export default store