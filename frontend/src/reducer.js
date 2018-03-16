import { combineReducers } from 'redux';
import listPostReducer from './container/Post/AddPost/store/reducer'

const rootReducer = combineReducers({
  listPostReducer
})

export default rootReducer
