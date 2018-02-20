import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import store from './store'
import client from './apolloClient'
import Routes from './routes'
import './index.css'


ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)
