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
      console.log(data);
      this.setState({
        posts: data.allPosts
      }, () => {
        console.log(this.state)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable App</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const Query = gql`{
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
