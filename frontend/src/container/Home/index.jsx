import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import List from '../../components/List'
import Container from './styled'
import { ALL_POSTS } from './queries'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      postActive: '',
      sort: 'desc'
    }
  }

  componentWillReceiveProps(nextProps) {
    const loading = nextProps.loading
    const data = nextProps.data

    if(!loading){
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
    this.props.deletePost({
      variables: {
        id
      },
      refetchQueries: [{
        query: ALL_POSTS
      }]
    })
    .then(() => this.props.data.refetch())
    .catch(error => console.log(error))
  }

  likePost = id => {
    console.log('like: ', id)
  }

  dislikePost = id => {
    console.log('dislike: ', id)
  }

  orderPost = () => {
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    this.setState(prevState => ({
      posts: orderBy(prevState.posts, 'title', sort),
      sort
    }))
  }

  render() {
    const { data: { loading } } = this.props
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
              <List
                title="Posts"
                posts={posts}
                likePost={id => this.likePost(id)}
                dislikePost={id => this.dislikePost(id)}
                remove={id => this.deletePost(id)}
              />
            </div>
          )}
        </div>
      </Container>
    );
  }
}

Home.defaultProps = {
  id: ''
}

Home.propTypes = {
  id: PropTypes.any.isRequired,
  allPosts: PropTypes.func,
  orderPosts: PropTypes.func
}

const DeletePost = gql`mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}
`

export default compose(
  graphql(ALL_POSTS),
  graphql(DeletePost, {name: 'deletePost'}),
)(Home)
