export const types = {
  SAY_HELLO: 'HOME/SAY_HELLO',
  ALL_POSTS: 'HOME/ALL_POSTS',
  ORDER_POSTS: 'HOME/ORDER_POSTS'
}

export const actions = {
  sayHello: text => ({ type: types.SAY_HELLO, text}),
  allPosts: data => ({ type: types.ALL_POSTS, data }),
  orderPosts: () => ({ type: types.ORDER_POSTS })
}
