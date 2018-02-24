import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import List from '../../components/List'
import Container from './styled'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postTitle: '',
      postActive: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const data = nextProps.data
    if(data) {
      console.log('Posts: ', data.posts)
      this.setState({
        posts: data.posts
      })
    }
  }

  loadPost = id => {
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

  render() {
    const { posts, postTitle } = this.state
    const hasPosts = !isEmpty(posts)

    console.log(orderBy(posts, 'voteScore', 'desc'))

    return (
      <Container>
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
          {/* <Filter list={posts} orderBy="voteScore" /> */}
          {hasPosts && <List posts={posts} />}
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
