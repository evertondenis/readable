import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import Comments from './Comments'
import NotFound from 'container/NotFound'
import { CircularProgress, Button } from 'react-md'
import { ALL_POSTS, SINGLE_POST } from 'graphql/queries'
import { DELETE_POST, VOTE_POST } from 'graphql/mutations'


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
            <Button icon primary onClick={() => this.votePost(post.id, 'upVote')}>thumb_up</Button>
            <Button icon primary onClick={() => this.votePost(post.id, 'downVote')}>thumb_down</Button>
            <Button icon primary><Link to={`/post/edit/${post.id}`}>edit</Link></Button>
            <Button icon primary onClick={() => this.deletePost(post.id)}>delete</Button>

            {/* <button onClick={() => this.votePost(post.id, 'upVote')} >UP</button>
            <button onClick={() => this.votePost(post.id, 'downVote')} >DOWN</button>
            <Link to={`/post/edit/${post.id}`} className='edit-post'>edit</Link>
            <button onClick={() => this.deletePost(post.id)} >delete</button> */}
          </div>
          <p><span>category: </span>{post.category}</p>
        </article>
        <Comments parentId={post.id} />
      </div>
    ) : (
      <NotFound />
    )
  }

  render() {
    const { data: { loading, post } } = this.props
    const postActive = !loading && first(post)

    return (
      <div>
        {loading && <CircularProgress id="all-posts" />}
        {!loading && this.renderPost(postActive)}
      </div>
    )
  }
}

export default compose(
  graphql(
  SINGLE_POST, {
    options: ({ match }) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(DELETE_POST, {name: 'deletePost'}),
  graphql(VOTE_POST, {name: 'votePost'})
)(Post)
