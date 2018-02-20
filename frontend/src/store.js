import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'

const middleware = []

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

export default store
