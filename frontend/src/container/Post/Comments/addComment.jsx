import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { actions } from './store/actions'
import { ALL_POSTS, ALL_COMMENTS } from 'graphql/queries'
import { ADD_COMMENT } from 'graphql/mutations'

class AddComment extends Component {

  createComment = form => {
    form.preventDefault()
    const { parentId, postAuthor, postBody, cleanForm } = this.props

    if(postAuthor !== '') {
      this.props.addComment({
        variables: {
          timestamp: 1467166872634,
          parentId,
          body: postBody,
          author: postAuthor
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
      }).then(({ data }) => {
        cleanForm()
      }).catch((error) => console.log(error))
    }
  }

  render() {
    const { updateFormAuthor, updateFormBody, postAuthor, postBody } = this.props

    return (
      <div>
        <form onSubmit={this.createComment}>
          <div>
            <input
              className="form-control"
              name="author"
              value={postAuthor}
              placeholder="author"
              onChange={event => updateFormAuthor(event.target.value)}
            />
          </div>
          <div>
            <textarea
              className="form-control"
              name="body"
              value={postBody}
              onChange={event => updateFormBody(event.target.value)}
              row="4"
            />
          </div>
          <div className="col-md-12 text-center">
            <button type="submit">ADD COMMENT</button>
          </div>
        </form>
      </div>
    )
  }
}

AddComment.propTypes = {
  updateFormAuthor: PropsTypes.func.isRequired,
  updateFormBody: PropsTypes.func.isRequired,
  cleanForm: PropsTypes.func
}

const mapProps = ({ commentReducer }) => commentReducer

export default compose(
  connect(mapProps, actions),
  graphql(ADD_COMMENT, {name: 'addComment'})
)(AddComment)
