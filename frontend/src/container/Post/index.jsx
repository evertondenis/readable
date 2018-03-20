import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import Comments from './Comments'


class Post extends Component {
  renderPost = post => {
    const hasPost = !isEmpty(post)

    return hasPost ? (
      <div>
        <article>
          <h1>{post.title}</h1>
          <p><span>author: </span>{post.author}</p>
          <p>{post.body}</p>
          <p><span>category: </span>{post.category}</p>
        </article>
        <Comments parentId={post.id} />
      </div>
    ) : (
      <Redirect to={`/${post.category}`} />
    )
  }

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
        {!loading && this.renderPost(postActive)}
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
