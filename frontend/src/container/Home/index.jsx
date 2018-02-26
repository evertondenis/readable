import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
      postActive: '',
      sort: 'desc'
    }
  }

  componentWillReceiveProps (nextProps) {
    const data = nextProps.data
    if(data) {
      console.log('Posts: ', data.posts)
      this.setState({
        posts: orderBy(data.posts, 'voteScore', 'desc')
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
    }).catch(error => console.log(error))
  }

  deletePost = id => {
    console.log(id)
    this.props.deletePost({
      variables: {
        id
      },
      refetchQueries: [{
        query: Query
      }]
    })
    .then(({ data }) => {
      this.setState({
        posts: orderBy(data.posts, 'voteScore', 'desc')
      })
    })
    .catch(error => console.log(error))
  }

  orderPost = () => {
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    this.setState(prevState => ({
      posts: orderBy(prevState.posts, 'title', sort),
      sort
    }))
  }

  render() {
    const { posts } = this.state
    const hasPosts = !isEmpty(posts)

    return (
      <Container>
        <div className="container">
          {hasPosts && (
            <div>
              <button onClick={this.orderPost} >Order Posts</button>
              <Link to={'/add-post'} >Add Post</Link>
              <List posts={posts} remove={() => this.deletePost} />
            </div>
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

const DeletePost = gql`mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}
`


export default compose(
  graphql(Query),
  graphql(DeletePost, {name: 'deletePost'})
)(App)
