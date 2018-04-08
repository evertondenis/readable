import gql from 'graphql-tag'

export const ADD_POSTS = gql`
  mutation addPost(
    $timestamp: Float,
    $title: String!,
    $body: String,
    $author: String,
    $category: String
  ) {
    addPost(
      timestamp: $timestamp,
      title: $title,
      body: $body,
      author: $author,
      category: $category
    ) {
      timestamp
      title
      body
      author
      category
    }
  }
`

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`
export const VOTE_POST = gql`
  mutation votePost($id: ID!, $type: String!) {
    votePost(id: $id, type: $type) {
      id
    }
  }
`

export const EDIT_POST = gql`
  mutation editPost(
    $id: ID!,
    $title: String!,
    $body: String,
    $author: String,
    $category: String
  ) {
    editPost(
      id: $id,
      title: $title,
      body: $body,
      author: $author,
      category: $category
    ) {
      id
      title
      body
      author
      category
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment(
    $parentId: String!,
    $timestamp: Float,
    $body: String,
    $author: String
  ) {
    addComment(
      parentId: $parentId,
      timestamp: $timestamp,
      body: $body,
      author: $author
    ) {
      timestamp
      body
      author
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!, $parentId: String) {
    deleteComment(id: $id, parentId: $parentId) {
      id
      parentId
    }
  }
`

export const VOTE_COMMENT = gql`
  mutation voteComment($id: ID!, $type: String!) {
    voteComment(id: $id, type: $type) {
      id
    }
  }
`

export const EDIT_C0MMENT = gql`
  mutation editComment(
    $id: ID!,
    $body: String,
    $author: String
  ) {
    editComment(
      id: $id,
      body: $body,
      author: $author
    ) {
      id
      author
      body
    }
  }
`
