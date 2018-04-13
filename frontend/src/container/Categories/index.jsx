import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { Grid, Cell, CircularProgress } from 'react-md'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'
import List from 'components/List'
import Container from './styled'
import { ALL_POSTS, POST_BY_CATEGORY } from 'graphql/queries'
import { DELETE_POST, VOTE_POST } from 'graphql/mutations'


class Categories extends Component {

  state = {
    sort: 'desc',
    category: ''
  }

  componentWillReceiveProps(nextProps) {
    const loading = nextProps.loading
    const posts = nextProps.posts
    const category = nextProps.match.params.category

    if(!loading){
      this.setState({
        posts: orderBy(posts.posts, 'voteScore', 'desc'),
        category
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

  votePost = (id, type) => {
    this.props.votePost({
      variables: {
        id,
        type
      },
      refetchQueries: [{
        query: POST_BY_CATEGORY,
        variables: {
          category: this.state.category
        }
      }]
    })
    .then(() => null)
    .catch(error => console.log(error))
  }

  deletePost = id => {
    this.props.deletePost({
      variables: {
        id
      },
      refetchQueries: [{
        query: ALL_POSTS,
      },{
        query: POST_BY_CATEGORY,
        variables: {
          category: this.state.category
        }
      }]
    })
    .then(() => null)
    .catch(error => console.log(error))
  }

  orderPost = () => {
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    this.setState(prevState => ({
      posts: orderBy(prevState.posts, 'title', sort),
      sort
    }))
  }

  renderCategory = posts => {
    return (
      <Grid>
        <Cell size={12}>
          <button onClick={this.orderPost} >Order Posts</button>
        </Cell>
        <List
          title="Posts"
          posts={posts}
          votePost={(id, type) => this.votePost(id, type)}
          remove={id => this.deletePost(id)}
        />
      </Grid>
    )
  }

  render() {
    const { posts: { loading } } = this.props
    const { posts } = this.state
    const hasPosts = !isEmpty(posts)

    return (
      <Container>
        {loading && <CircularProgress id="all-posts" />}
        {!loading && hasPosts ? this.renderCategory(posts) : !loading && <h1>Don't have any post here ;(</h1>}
      </Container>
    )
  }
}

Categories.defaultProps = {
  id: ''
}

Categories.propTypes = {
  id: PropTypes.any.isRequired,
  allPosts: PropTypes.func,
  orderPosts: PropTypes.func
}

export default compose(
  graphql(POST_BY_CATEGORY, {
    options: ({ match }) => ({
      variables: {
        category: match.params.category
      }
    }),
    name: 'posts'
  }),
  graphql(DELETE_POST, {name: 'deletePost'}),
  graphql(VOTE_POST, {name: 'votePost'}),
)(Categories)
