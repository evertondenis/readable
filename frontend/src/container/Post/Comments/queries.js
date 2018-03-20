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

export const DELETE_COMMENT = gql`mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}
`

export const VOTE_COMMENT = gql`mutation votePost($id: ID!, $type: String!) {
  votePost(id: $id, type: $type) {
    id
  }
}
`

export const ALL_POSTS = gql`query posts {
  posts {
    commentCount
  }
}`
