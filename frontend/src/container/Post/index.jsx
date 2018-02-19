import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import first from 'lodash/first'

//const Post = ({ data: { post } }) => {
class Post extends Component {
  render() {
    const { data: { post } } = this.props
    const hasPost = !isEmpty(post)
    const postActive = hasPost && first(post)

    return (
      <div>
        <NavLink
          exact to='/'
          className='Header-navLink'
          activeClassName='Header-isActive'
        >
          Back to Home
        </NavLink>
        {!hasPost && <p>Loading...</p>}
        {hasPost && (
          <article>
            <h1>{postActive.title}</h1>
          </article>
        )}
      </div>
    )
  }
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
