import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import first from 'lodash/first'
import Comments from './comments'


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
          <div>
            <article>
              <h1>{postActive.title}</h1>
              <p><span>author: </span>{postActive.author}</p>
              <p>{postActive.body}</p>
              <p><span>category: </span>{postActive.category}</p>
            </article>
            <Comments parentId={postActive.id} />
          </div>
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
