import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from './store/actions'

class AddComment extends Component {
  render() {
    const { updateFormAuthor, updateFormBody } = this.props

    return (
      <div>
        <form onSubmit={() => console.log('this.createPost')}>
          <div>
            <input
              className="form-control"
              name="author"
              value="postAuthor"
              placeholder="author"
              onChange={evt => updateFormAuthor(evt.target.value)}
            />
          </div>
          <div>
            <textarea
              className="form-control"
              name="body"
              value="postBody"
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
  handlerOnChange: PropsTypes.func.isRequired
}

const mapProps = ({ addCommentReducer }) => addCommentReducer

export default connect(mapProps, actions)(AddComment)
