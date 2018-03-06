import { createReducer } from '../../core/utils/redux'
import { types } from './actions'
import orderBy from 'lodash/orderBy'

export const initialState = {
  message: '',
  sort: 'asc',
  posts: []
}

const reducer = {
  [types.SAY_HELLO](state, { text }) {
    console.log('SAY_HELLO state: ', state)
    return { ...state, message: text}
  },
  [types.ALL_POSTS](state, { data }) {
    console.log('ALL_POSTS: ', state.posts)
    //console.log('data: ', data)
    return { ...state, posts: data }
  },
  [types.ORDER_POSTS](state) {
    console.log(state.posts)
    const sort = state.sort === 'asc' ? 'desc' : 'asc'
    const posts = orderBy(state.posts, 'title', sort)
    return { ...state, posts, sort }
  }
}

export default createReducer(initialState, reducer)
