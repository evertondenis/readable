import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postTitle: '',
      postActive: ''
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

  loadPost = id => {
    this.props.postById({
      variables: {
        id
      },
    }).then(({ data }) => {
      // does get resolved, I have all the data from the response
      console.log(data)
      this.setState({
        postActive: data.postById[0]
      })
    }).catch((error) => {
      console.log(error)
    })
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
    const { posts, postTitle, postActive } = this.state
    const condition = !!postActive

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable App</h1>
        </header>
        <div className="container">
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
          {posts.map(item => <a key={item.id} onClick={() => this.loadPost(item.id)}>{item.title}</a>)}
          {condition && (
            <ul>
              <li><span className="title">Título:</span> {postActive.title}</li>
              <li><span className="title">Descrição:</span> {postActive.body}</li>
              <li><span className="title">ID:</span> {postActive.id}</li>
              <li><span className="title">Categoria:</span> {postActive.category}</li>
            </ul>
          )}
        </div>
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

const PostById = gql`mutation postById($id: ID!) {
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
  graphql(PostById, {name: 'postById'})
)(App);
