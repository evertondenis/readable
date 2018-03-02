import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postSuccess: false
    }
  }

  createPost = form => {
    form.preventDefault()
    const title = form.target.title.value

    if(title !== '') {
      this.props.addPost({
        variables: {
          timestamp: '1467166872634',
          title,
          body: 'body',
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

  updateInput = data => {
    this.setState({
      postTitle: data
    })
  }

  render() {
    const { postTitle, postSuccess } = this.state
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
              <input
                className="form-control"
                name="title"
                value={postTitle}
                placeholder="add new post"
                onChange={el => this.setState({ postTitle: el.target.value })}
                autoFocus
              />
              <button type="submit">ADD POST</button>
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

export default compose(
  graphql(Query),
  graphql(AddPost, {name: 'addPost'})
)(CreatePost)
