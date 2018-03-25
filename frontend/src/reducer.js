import { combineReducers } from 'redux';
import addPostReducer from './container/Post/AddPost/store/reducer'
import editPostReducer from './container/Post/EditPost/store/reducer'
import addCommentReducer from './container/Post/Comments/store/reducer'

const rootReducer = combineReducers({
  addPostReducer,
  editPostReducer,
  addCommentReducer
})

export default rootReducer
