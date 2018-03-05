import { createReducer } from '../../core/utils/redux'
import { types } from './actions'

export const initialState = {
  message: '',
  posts: []
}

const reducer = {
  [types.SAY_HELLO](state, { text }) {
    console.log('SAY_HELLO state: ', state)
    return { ...state, message: text}
  },
  [types.ALL_POSTS](state, { data }) {
    console.log('POSTS: ', data)
    return { ...state, posts: data }
  }
}

export default createReducer(initialState, reducer)
