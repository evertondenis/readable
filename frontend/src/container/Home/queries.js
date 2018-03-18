import gql from 'graphql-tag'

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

export const DELETE_POST = gql`mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}
`

export const VOTE_POST = gql`mutation votePost($id: ID!, $type: String!) {
  votePost(id: $id, type: $type) {
    id
  }
}
`
