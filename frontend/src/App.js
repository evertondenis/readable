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

    //this.createPost = this.createPost.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const data = nextProps.data
    if(data) {
      console.log('Posts: ', data.posts)
      this.setState({
        posts: data.posts
      }, () => {
        console.log('this.state:', this.state)
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
      console.log('loadPost: ', data)
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
    }).catch((error) => console.log(error))
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

const AddPost = gql`
mutation addPost($timestamp: String, $title: String!, $body: String, $author: String, $category: String) {
  addPost(timestamp: $timestamp, title: $title, body: $body, author: $author, category: $category) {
    id
    timestamp
    title
    body
    author
    category
  }
}`

export default compose(
  graphql(Query),
  //graphql(PostById, {name: 'postById'}),
  graphql(AddPost, {name: 'addPost'})
)(App);
