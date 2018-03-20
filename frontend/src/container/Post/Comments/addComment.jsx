import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { actions } from './store/actions'
import { ADD_COMMENT, ALL_POSTS } from './queries'

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
            query: gql`
              query comments($parentId: String!) {
                comments(parentId: $parentId) {
                  id
                  parentId
                  body
                  author
                  voteScore
                  deleted
                  parentDeleted
                }
              }
            `,
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
              onChange={evt => updateFormAuthor(evt.target.value)}
            />
          </div>
          <div>
            <textarea
              className="form-control"
              name="body"
              value={postBody}
              onChange={evt => updateFormBody(evt.target.value)}
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

const mapProps = ({ addCommentReducer }) => addCommentReducer

export default compose(
  connect(mapProps, actions),
  graphql(ADD_COMMENT, {name: 'addComment'})
)(AddComment)
