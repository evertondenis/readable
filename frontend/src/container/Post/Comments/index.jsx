import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import AddComment from './addComment'
import { ALL_COMMENTS, DELETE_COMMENT, VOTE_COMMENT } from './queries'
import { StyledComments } from './styled'


class Comments extends Component {

  voteComment = (id, type) => {
    console.log('voteComment: ', id, type)
    /* this.props.voteComment({
      variables: {
        id,
        type
      },
      refetchQueries: [{
        query: ALL_COMMENTS
      }]
    })
    .then(() => this.props.data.refetch())
    .catch(error => console.log(error)) */
  }

  deleteComment = id => {
    console.log('deleteComment: ', id)
    /* this.props.deleteComment({
      variables: {
        id
      },
      refetchQueries: [{
        query: ALL_COMMENTS
      }]
    })
    .then(() => this.props.data.refetch())
    .catch(error => console.log(error)) */
  }

  renderComments = ({ id, body, author }) => {
    return (
      <StyledComments key={id}>
        <p>{body}</p>
        <p><span>author: </span>{author}</p>
        <div>
          <button onClick={() => this.voteComment(id, 'upVote')} >UP</button>
          <button onClick={() => this.voteComment(id, 'downVote')} >DOWN</button>
        </div>
        <div>
          <p><button onClick={() => this.deleteComment(id)} >delete</button></p>
        </div>
      </StyledComments>
    )
  }

  render() {
    const { data: { loading, comments }, parentId } = this.props
    const hasComments = !loading && comments

    return (
      <div>
        {loading && <p>Loading...</p>}
        <h2>Comments:</h2>
        {(!loading && !isEmpty(hasComments)) && (
          map(hasComments, comment => this.renderComments(comment))
        )}
        <AddComment parentId={parentId} />
      </div>
    )
  }
}


export default compose(
  graphql(ALL_COMMENTS),
  graphql(DELETE_COMMENT, {name: 'deleteComment'}),
  graphql(VOTE_COMMENT, {name: 'voteComment'}),
)(Comments)
