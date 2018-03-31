import gql from 'graphql-tag'

export const SINGLE_POST = gql`
  query singlePost($id: ID!) {
    post: singlePost(id: $id) {
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
  }
`

export const ALL_POSTS = gql`
  query posts {
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
  }
`

export const CATEGORIES = gql`query categories {
  categories {
    name
    path
  }
}`

export const ADD_POST = gql`
  mutation addPost($timestamp: Float, $title: String!, $body: String, $author: String, $category: String) {
    addPost(timestamp: $timestamp, title: $title, body: $body, author: $author, category: $category) {
      timestamp
      title
      body
      author
      category
    }
  }
`

export const EDIT_POST = gql`
  mutation editPost($id: ID!, $title: String!, $body: String, $author: String, $category: String) {
    editPost(id: $id, title: $title, body: $body, author: $author, category: $category) {
      id
      title
      body
      author
      category
    }
  }
`
