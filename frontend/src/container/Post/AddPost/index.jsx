import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { NavLink, Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { actions } from './store/actions'

class CreatePost extends Component {

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
          query: Query
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
    const { updateFormTitle, updateFormBody, postTitle, postBody } = this.props
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

const Query = gql`query posts {
  posts {
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
}`

const AddPost = gql`
  mutation addPost($timestamp: String, $title: String!, $body: String, $author: String, $category: String) {
    addPost(timestamp: $timestamp, title: $title, body: $body, author: $author, category: $category) {
      timestamp
      title
      body
      author
      category
    }
  }
`

AddPost.propTypes = {
  updateFormTitle: PropsTypes.func.isRequired
}

const mapProps = ({ listPostReducer }) => listPostReducer

export default compose(
  connect(mapProps, actions),
  graphql(Query),
  graphql(AddPost, {name: 'addPost'})
)(CreatePost)
