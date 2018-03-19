import { createReducer } from '../../../../core/utils/redux'
import { types } from './actions'

export const initialState = {
  postTitle: '',
  postAuthor: '',
  postCategory: '',
  postBody: ''
}

const reducer = {
  [types.UPDATE_FORM_TITLE](state, { text }) {
    const postTitle = text
    return { ...state, postTitle }
  },
  [types.UPDATE_FORM_AUTHOR](state, { text }) {
    const postAuthor = text
    return { ...state, postAuthor }
  },
  [types.UPDATE_FORM_BODY](state, { text }) {
    const postBody = text
    return { ...state, postBody }
  },
  [types.UPDATE_FORM_CATEGORY](state, { option }) {
    const postCategory = option
    return { ...state, postCategory }
  },
  [types.UPDATE_FORM_CLEAN](state) {
    const postTitle = ''
    const postAuthor = ''
    const postCategory = ''
    const postBody = ''
    return { ...state, postTitle, postAuthor, postCategory, postBody }
  }
}

export default createReducer(initialState, reducer)
