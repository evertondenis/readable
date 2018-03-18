import gql from 'graphql-tag'

export const ALL_POSTS = gql`query posts {
  posts {
    id
    timestamp
    title
    body
    author
    category
    voteScore
    deleted
    commentCount
  }
}`

export const CATEGORIES = gql`query categories {
  categories {
    name
    path
  }
}`

export const ADD_POSTS = gql`
  mutation addPost($timestamp: String, $title: String!, $body: String, $author: String, $category: String) {
    addPost(timestamp: $timestamp, title: $title, body: $body, author: $author, category: $category) {
      timestamp
      title
      body
      author
      category
    }
  }
`
