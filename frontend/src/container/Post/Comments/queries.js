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
