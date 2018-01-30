import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
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

  render() {
    const { posts } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable App</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>Posts:</h2>
        {posts.map(item => <p key={item.id}>{item.title}</p>)}
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

export default compose(
  graphql(Query)
)(App);
