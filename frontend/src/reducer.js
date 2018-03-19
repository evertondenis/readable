import { combineReducers } from 'redux';
import listPostReducer from './container/Post/AddPost/store/reducer'
import addCommentReducer from './container/Post/Comments/store/reducer'

const rootReducer = combineReducers({
  listPostReducer,
  addCommentReducer
})

export default rootReducer
