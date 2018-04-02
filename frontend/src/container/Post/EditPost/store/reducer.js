import { createReducer } from '../../../../core/utils/redux'
import { types } from './actions'

export const initialState = {
  postTitle: '',
  postAuthor: '',
  postCategory: '',
  postBody: '',
  hasFields: false
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
  },
  [types.SET_FIELDS](state, { data }) {
    const { title, author, body } = data
    const hasFields = true
    return { ...state, postTitle: title, postAuthor: author, postBody: body, hasFields }
  }
}

export default createReducer(initialState, reducer)
