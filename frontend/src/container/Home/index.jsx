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
//import { compose } from 'redux'
import { actions } from './actions'

import { ALL_POSTS } from './queries'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postTitle: '',
      postActive: '',
      sort: 'desc'
    }
  }

  /* componentWillReceiveProps(nextProps) {
    const { filters, loadProfiles } = this.props

    watchFilters(loadProfiles, filters, nextProps.filters)
  } */

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data

    if(data) {
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
        query: ALL_POSTS
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
    const { data: { loading }, message, sayHello } = this.props
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

Home.defaultProps = {
  id: ''
}

Home.propTypes = {
  id: PropTypes.any.isRequired,
  message: PropTypes.string,
  sayHello: PropTypes.func,
  allPosts: PropTypes.func,
  posts: PropTypes.array,
  orderPosts: PropTypes.func
}

const DeletePost = gql`mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}
`

const mapProps = ({ homeReducer }) => homeReducer

/* const mapQueryToProps = ({data: { getPage: { page } }, ownProps}) =>
  ({ curPage: page })
 */
//const mapProps = ({ loading, posts }, ownProps) => ({posts: posts})

export default compose(
  graphql(ALL_POSTS),
  graphql(DeletePost, {name: 'deletePost'}),
  connect(mapProps, actions)
)(Home)
