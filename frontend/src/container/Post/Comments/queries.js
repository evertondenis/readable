import gql from 'graphql-tag'

export const ALL_COMMENTS = gql`
  query comments($parentId: String!) {
    comments: comments(parentId: $parentId) {
      id
      parentId
      body
      author
      voteScore
      deleted
      parentDeleted
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

export const ALL_POSTS = gql`query posts {
  posts {
    commentCount
  }
}`
