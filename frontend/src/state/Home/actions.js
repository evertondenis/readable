export const types = {
  SAY_HELLO: 'HOME/SAY_HELLO'
}

export const actions = {
  sayHello: text => ({ type: types.SAY_HELLO, text})
}
