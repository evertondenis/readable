import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import Container from './styled'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postTitle: '',
      postActive: ''
    }

    //this.createPost = this.createPost.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const data = nextProps.data
    if(data) {
      console.log('Posts: ', data.posts)
      this.setState({
        posts: data.posts
      }, () => {
        //console.log('this.state:', this.state)
      })
    }
  }

  loadPost = id => {
    /* console.log(id)
    console.log(this.props); */

    this.props.postById({
      variables: id
    })
    .then(({ data }) => {
      this.setState({
        postActive: data.postById[0]
      })
    }).catch((error) => console.log(error))
  }

  updateInput = data => {
    this.setState({
      postTitle: data
    })
  }

  createPost = e => {
    e.preventDefault()
    const title = e.target.title.value

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
        console.log('createPost: ', data)
        this.setState({
          postTitle: ''
        })
      }).catch((error) => console.log(error))
    }
  }

  renderList = posts => {
    return (
      <div>
        {posts.map(post => (
          <Link key={`post-${post.id}`} to={`/post/${post.id}`} className='Home-link'>
            {post.title}
          </Link>
        ))}
      </div>
    )
  }

  render() {
    const { posts, postTitle, postActive } = this.state
    const hasPosts = !isEmpty(posts)
    const condition = !!postActive

    return (
      <Container>
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable App</h1>
        </header>
        <div className="container">
          <form onSubmit={this.createPost}>
            <input
              className="form-control"
              name="title"
              value={postTitle}
              placeholder="add new post"
              onChange={ev => this.updateInput(ev.target.value)}
            />
            <button type="submit">ADD POST</button>
          </form>
          <h2>Posts:</h2>
          {hasPosts && this.renderList(posts)}
          {condition && (
            <ul>
              <li><span className="title">Título:</span> {postActive.title}</li>
              <li><span className="title">Descrição:</span> {postActive.body}</li>
              <li><span className="title">ID:</span> {postActive.id}</li>
              <li><span className="title">Categoria:</span> {postActive.category}</li>
            </ul>
          )}
        </div>
      </Container>
    );
  }
}

App.defaultProps = {
  id: ''
}

App.propTypes = {
  id: PropTypes.any.isRequired
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
}`

export default compose(
  graphql(Query),
  graphql(AddPost, {name: 'addPost'})
)(App)
