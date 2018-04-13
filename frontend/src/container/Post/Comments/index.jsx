import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { actions } from './store/actions'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import AddComment from './addComment'
import EditComment from './editComment'
import { ALL_POSTS, ALL_COMMENTS } from 'graphql/queries'
import { DELETE_COMMENT, VOTE_COMMENT } from 'graphql/mutations'
import { Button } from 'react-md'
import { StyledComments } from './styled'


class Comments extends Component {

  voteComment = (id, type) => {
    this.props.voteComment({
      variables: {
        id,
        type
      },
      refetchQueries: [
        {
          query: ALL_COMMENTS,
          variables: {
            parentId: this.props.parentId,
          },
        }
      ]
    })
    .then(() => this.props.data.refetch())
    .catch(error => console.log(error))
  }

  deleteComment = (id, parentId) => {
    this.props.deleteComment({
      variables: {
        id,
        parentId
      },
      refetchQueries: [
        {
          query: ALL_POSTS
        },
        {
          query: ALL_COMMENTS,
          variables: {
            parentId: this.props.parentId,
          },
        },
      ]
    })
    .then(() => this.props.data.refetch())
    .catch(error => console.log(error))
  }

  renderComments = ({ id, parentId, body, author, voteScore }) => {
    const { openEditModal } = this.props
    return (
      <StyledComments key={id}>
        <p>{body}</p>
        <p><span>author: </span>{author}</p>
        <p><span>score: </span>{voteScore}</p>
        <div>
          <Button icon primary onClick={() => this.voteComment(id, 'upVote')}>thumb_up</Button>
          <Button icon primary onClick={() => this.voteComment(id, 'downVote')}>thumb_down</Button>
          <Button icon primary onClick={() => openEditModal(id)}>edit</Button>
          <Button icon primary onClick={() => this.deleteComment(id, parentId)}>delete</Button>
        </div>
      </StyledComments>
    )
  }

  hide = () => {
    this.setState({ visible: false })
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
        <EditComment />
      </div>
    )
  }
}

const mapProps = ({ commentReducer }) => commentReducer

export default compose(
  connect(mapProps, actions),
  graphql(ALL_COMMENTS),
  graphql(DELETE_COMMENT, {name: 'deleteComment'}),
  graphql(VOTE_COMMENT, {name: 'voteComment'}),
)(Comments)
