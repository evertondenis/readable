export function createReducer(initialState, actions) {
  return (state = initialState, action) => {
    const reducer = actions[action.type]
    return reducer ? reducer(state, action) : state
  }
}
