import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import first from 'lodash/first'


class Post extends Component {
  render() {
    const { data: { loading, post } } = this.props
    const postActive = !loading && first(post)

    return (
      <div>
        <NavLink
          exact to='/'
          className='Header-navLink'
          activeClassName='Header-isActive'
        >
          Back to Home
        </NavLink>
        {loading && <p>Loading...</p>}
        {!loading && (
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
