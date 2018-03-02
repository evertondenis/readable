import { createReducer } from '../../core/utils/redux'
import { types } from './actions'

export const initialState = {
  message: ''
}

const reducer = {
  [types.SAY_HELLO](state, { text }) {
    return { ...state, message: text}
  }
}

export default createReducer(initialState, reducer)
