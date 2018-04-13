import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { NavLink, Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { actions } from './store/actions'
import { ALL_POSTS } from 'graphql/queries'
import { ADD_POSTS, DELETE_POST, VOTE_POST } from 'graphql/mutations'

class AddComment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      postSuccess: false
    }
  }

  createPost = form => {
    form.preventDefault()
    const title = form.target.title.value
    const body = form.target.body.value

    if(title !== '') {
      this.props.addPost({
        variables: {
          timestamp: '1467166872634',
          title,
          body,
          author: 'admin',
          category: 'redux'
        },
        refetchQueries: [{
          query: ALL_POSTS
        }]
      }).then(({ data }) => {
        this.setState({
          postTitle: '',
          postSuccess: true
        })
      }).catch((error) => console.log(error))
    }
  }

  render() {
    const { postSuccess } = this.state
    const { updateFormTitle, updateFormBody, updateFormAuthor, postTitle, postAuthor, postBody } = this.props
    return (
      <div>
        {!postSuccess ? (
          <div>
            <NavLink
              exact to='/'
              className='Header-navLink'
              activeClassName='Header-isActive'
            >
              Back to Home
            </NavLink>
            <form onSubmit={this.createPost}>
              <div>
                <input
                  className="form-control"
                  name="title"
                  value={postTitle}
                  placeholder="Title"
                  onChange={evt => updateFormTitle(evt.target.value)}
                  autoFocus
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
                <button type="submit">ADD POST</button>
              </div>
            </form>
          </div>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    )
  }
}

AddPost.propTypes = {
  updateFormTitle: PropsTypes.func.isRequired,
}

const mapProps = ({ listPostReducer }) => listPostReducer

export default compose(
  connect(mapProps, actions),
  graphql(ALL_POSTS),
  graphql(ADD_POSTS, {name: 'addPost'})
)(AddComment)
