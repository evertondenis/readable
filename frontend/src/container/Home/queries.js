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
