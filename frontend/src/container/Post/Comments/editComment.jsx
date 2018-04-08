import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { actions } from './store/actions'
import { graphql, compose } from 'react-apollo'
import { SINGLE_COMMENT, ALL_COMMENTS } from 'graphql/queries'
import { EDIT_COMMENT } from 'graphql/mutations'
import {
  Button,
  DialogContainer,
  CardActions,
  TextField
} from 'react-md'


class EditComment extends Component {

  state = {
    commentId: '',
    commentAuthor: '',
    commentBody: '',
    parentId: ''
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.singleComment.comment[0]

    if(data) {
      this.setState({
        commentId: this.props.commentId,
        commentAuthor: data.author,
        commentBody: data.body,
        parentId: data.parentId
      })
    }
  }

  updateAuthorField = commentAuthor => {
    this.setState({ commentAuthor })
  }

  updateBodyField = commentBody => {
    this.setState({ commentBody })
  }

  editComment = form => {
    form.preventDefault()
    const { commentId, commentAuthor, commentBody, parentId } = this.state

    if(commentAuthor !== '') {
      this.props.editComment({
        variables: {
          id: commentId,
          author: commentAuthor,
          body: commentBody,
          parentId
        },
        refetchQueries: [{
          query: ALL_COMMENTS,
          variables: {
            parentId,
          }
        }]
      }).then(({ data }) => {
        this.props.openEditModal(commentId)
      }).catch((error) => console.log(error))
    }
  }

  renderForm = () => {
    const { commentId, commentAuthor, commentBody } = this.state
    const { openEditModal } = this.props

    return (
      <form className="md-grid" onSubmit={this.editComment}>
        <TextField
          id="author"
          label="author"
          defaultValue={commentAuthor}
          onChange={this.updateAuthorField}
          className="md-cell md-cell--12"
          required
        />
        <TextField
          id="comment"
          label="Comment"
          rows={2}
          maxRows={6}
          defaultValue={commentBody}
          onChange={this.updateBodyField}
          className="md-cell md-cell--12"
        />
        <CardActions className="md-cell md-cell--12">
          <Button
            raised
            secondary
            type="button"
            className="md-cell--right"
            onClick={() => openEditModal(commentId)}
          >
            Cancel
          </Button>
          <Button raised primary type="submit" className="md-cell--right">Submit</Button>
        </CardActions>
      </form>
    )
  }

  render() {
    const { visible, openEditModal } = this.props
    const { commentId } = this.state

    return (
      <Fragment>
        <DialogContainer
          id="edit-comment"
          title="Edit Comment"
          visible={visible}
          onHide={() => openEditModal(commentId)}
          contentClassName="md-grid"
        >
          {this.renderForm()}
        </DialogContainer>
      </Fragment>
    )
  }
}

const mapProps = ({ commentReducer }) => commentReducer

export default compose(
  connect(mapProps, actions),
  graphql(
    SINGLE_COMMENT, {
      options: props => ({
        variables: {
          id: props.commentId
        }
      }),
      name: 'singleComment'
    }
  ),
  graphql(EDIT_COMMENT, {name: 'editComment'})
)(EditComment)
