import React, { Component } from 'react'
import { NavLink, Redirect, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import Comments from './Comments'
import { ALL_POSTS, DELETE_POST, VOTE_POST } from './queries'


class Post extends Component {

  votePost = (id, type) => {
    this.props.votePost({
      variables: {
        id,
        type
      },
      refetchQueries: [{
        query: ALL_POSTS
      }]
    })
    .then(() => this.props.data.refetch())
    .catch(error => console.log(error))
  }

  deletePost = id => {
    this.props.deletePost({
      variables: {
        id
      },
      refetchQueries: [{
        query: ALL_POSTS
      }]
    })
    .then(this.props.history.goBack())
    .catch(error => console.log(error))
  }

  renderPost = post => {
    const hasPost = !isEmpty(post)

    return hasPost ? (
      <div>
        <article>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <p><span>author: </span>{post.author}</p>
          <p><span>comments: {post.commentCount}</span></p>
          <p><span>score: {post.voteScore}</span></p>
          <div>
            <button onClick={() => this.votePost(post.id, 'upVote')} >UP</button>
            <button onClick={() => this.votePost(post.id, 'downVote')} >DOWN</button>
          </div>
          <div>
            <Link to={`/post/edit/${post.id}`} className='edit-post'>edit</Link>
            <button onClick={() => this.deletePost(post.id)} >delete</button>
          </div>
          <p><span>category: </span>{post.category}</p>
        </article>
        <Comments parentId={post.id} />
      </div>
    ) : (
      <Redirect to="" />
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

export default compose(
  graphql(
  SinglePost, {
    options: ({ match }) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(DELETE_POST, {name: 'deletePost'}),
  graphql(VOTE_POST, {name: 'votePost'})
)(Post)
