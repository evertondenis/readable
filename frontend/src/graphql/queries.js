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

export const SINGLE_COMMENT = gql`
  query singleComment($id: ID!) {
    comment: singleComment(id: $id) {
      id
      author
      body
      parentId
    }
  }
`

export const CATEGORIES = gql`
  query categories {
    categories {
      name
      path
    }
  }
`


