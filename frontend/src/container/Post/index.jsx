import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'

const Post = ({ data: { post } }) => {
  const hasPost = !isEmpty(post)
  console.log(hasPost)

  if(hasPost) {
    const item = first(post)
    console.log(item)

    return (
      <article>
        {hasPost &&
          <h1>{item.title}</h1>
        }
      </article>
    )
  }

  return <p>Loading...</p>
}

const SinglePost = gql`
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

export default graphql(SinglePost, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(Post)
