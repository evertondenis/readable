import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import store from './store'
import client from './apolloClient'
import Routes from './routes'
import WebFontLoader from 'webfontloader'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
