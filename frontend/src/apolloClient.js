import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_URL } from './config/api'

const client = new ApolloClient({
  link: createHttpLink({ uri: API_URL }),
  cache: new InMemoryCache(),
})

export default client
