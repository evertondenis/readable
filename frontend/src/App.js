import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postTitle: ''
    }

    this.loadPost = this.loadPost.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.addPost = this.addPost.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const data = nextProps.data
    if(data) {
      this.setState({
        posts: data.posts
      }, () => {
        //console.log('this.state:', this.state)
      })
    }
  }

  loadPost(id) {
    console.log(id)
    /* this.props.postById({
      variables: {
        id
      },
      refetchQueries: [{
        query: Query
      }]
    }).then((response) => {
      console.log('response', response)
    }).catch((err) => {
      console.log('err', err)
    }) */
  }

  updateInput(data) {
    this.setState({
      postTitle: data
    })
  }

  addPost(e) {
    e.preventDefault()
    console.log(e.target.title.value)
  }

  render() {
    const { posts, postTitle } = this.state
    console.log(posts)

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable App</h1>
        </header>
        <form onSubmit={this.addPost}>
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
        {posts.map(item => <p key={item.id} onClick={() => this.loadPost(item.id)}>{item.title}</p>)}
      </div>
    );
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

const PostById = gql`query postById($id: ID!) {
  postById(id: $id) {
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

export default compose(
  graphql(Query),
  graphql(PostById, {
    name: 'postById'
    /* options: props => ({
      variables: {
        id: props
      }
    }) */
  })
)(App);
