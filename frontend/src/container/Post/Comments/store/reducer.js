import { createReducer } from '../../../../core/utils/redux'
import { types } from './actions'

export const initialState = {
  postAuthor: '',
  postBody: ''
}

const reducer = {
  [types.UPDATE_FORM_AUTHOR](state, { text }) {
    const postAuthor = text
    return { ...state, postAuthor }
  },
  [types.UPDATE_FORM_BODY](state, { text }) {
    const postBody = text
    return { ...state, postBody }
  },
  [types.UPDATE_FORM_CLEAN](state) {
    const postAuthor = ''
    const postBody = ''
    return { ...state, postAuthor, postBody }
  }
}

export default createReducer(initialState, reducer)
