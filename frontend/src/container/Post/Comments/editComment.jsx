import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { actions } from './store/actions'
import { graphql, compose } from 'react-apollo'
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
    commentBody: ''
  }

  updateAuthorField = commentAuthor => {
    this.setState({ commentAuthor })
  }

  updateBodyField = commentBody => {
    this.setState({ commentBody })
  }

  editComment = form => {
    form.preventDefault()
    const { commentId, commentAuthor, commentBody } = this.state

    console.log('handleSubmit', commentAuthor, commentBody)

    /* if(postTitle !== '') {
      this.props.editPost({
        variables: {
          id: postId,
          title: postTitle,
          body: postBody,
          author: postAuthor,
          category: postCategory
        },
        refetchQueries: [{
          query: ALL_POSTS
        }]
      }).then(({ data }) => {
        this.props.openEditModal()
        }).catch((error) => console.log(error))
      }
    } */
  }

  renderForm = () => {
    const { commentAuthor, commentBody } = this.state
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
          <Button raised secondary type="button" className="md-cell--right" onClick={openEditModal}>Cancel</Button>
          <Button raised primary type="submit" className="md-cell--right">Submit</Button>
        </CardActions>
      </form>
    )
  }

  render() {
    const { visible, openEditModal } = this.props

    return (
      <Fragment>
        <DialogContainer
          id="edit-comment"
          title="Edit Comment"
          visible={visible}
          onHide={openEditModal}
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
  //graphql(EDIT_POST, {name: 'editComment'})
)(EditComment)
