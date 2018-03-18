import { createReducer } from '../../../../core/utils/redux'
import { types } from './actions'

export const initialState = {
  postTitle: '',
  postBody: ''
}

const reducer = {
  [types.UPDATE_FORM_TITLE](state, { text }) {
    const postTitle = text
    return { ...state, postTitle }
  },
  [types.UPDATE_FORM_BODY](state, { text }) {
    const postBody = text
    return { ...state, postBody }
  }
}

export default createReducer(initialState, reducer)
