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
    console.log(text)
    const title = text
    return { ...state, title }
  },
  [types.UPDATE_FORM_AUTHOR](state, { text }) {
    const postAuthor = text
    return { ...state, postAuthor }
  },
  [types.UPDATE_FORM_BODY](state, { text }) {
    console.log(text)
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
    console.log('set fields')
    const { id, title, author, body } = data[0]
    //console.log(id, title, author, body)
    const hasFields = true
    return { ...state, postTitle: title, postBody: body, hasFields }
  }
}

export default createReducer(initialState, reducer)
