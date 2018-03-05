import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import List from '../../components/List'
import Container from './styled'

import { connect } from 'react-redux'
import { actions } from '../../state/Home/actions'

//import { Query } from './foo'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postActive: '',
      sort: 'desc'
    }
  }

  componentWillReceiveProps (nextProps) {
    const { allPosts } = this.props
    const data = nextProps.data

    if(data) {
      allPosts(data.posts)
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
    .then(() => this.props.data.refetch())
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
    const { data: { loading }, message, sayHello, allPosts } = this.props
    const { posts } = this.state
    const hasPosts = !isEmpty(posts)

    return (
      <Container>
        <div className="container">
          {loading && <p>Loading...</p>}
          <Link to={'/add-post'} >Add Post</Link>
          {(!loading && hasPosts) && (
            <div>
              <button onClick={this.orderPost} >Order Posts</button>
              <List title="Posts" posts={posts} remove={id => this.deletePost(id)} />
            </div>
          )}
        </div>
        <button onClick={() => sayHello('Hello redux and GraphQL!')} >TEXT</button>
        <p>{message}</p>
      </Container>
    );
  }
}

App.defaultProps = {
  id: ''
}

App.propTypes = {
  id: PropTypes.any.isRequired,
  message: PropTypes.string,
  sayHello: PropTypes.func,
  allPosts: PropTypes.func,
  posts: PropTypes.array
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

const mapProps = ({ homeReducer }) => homeReducer

export default compose(
  graphql(Query),
  graphql(DeletePost, {name: 'deletePost'}),
  connect(mapProps, actions)
)(App)
