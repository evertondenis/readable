export const types = {
  SAY_HELLO: 'HOME/SAY_HELLO',
  ALL_POSTS: 'HOME/ALL_POSTS'
}

export const actions = {
  sayHello: text => ({ type: types.SAY_HELLO, text}),
  allPosts: data => ({ type: types.ALL_POSTS, data })
}
