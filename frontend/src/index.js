import React from 'react'
import ReactDOM from 'react-dom'
//import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
//import store from './store'
import client from './apolloClient'
import Routes from './routes'
import './core/assets/style'


ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
)
