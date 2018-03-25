import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { actions } from './store/actions'
import { SINGLE_POST, ALL_POSTS, CATEGORIES, ADD_POSTS } from './queries'
import Select from '../../../components/Form/Select'
import first from 'lodash/first'

class EditPost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      postSuccess: false
    }
  }

  /* componentWillReceiveProps(nextProps) {
    const loading = nextProps.data.loading
    const data = nextProps.data

    if(!loading){
      this.setState({
        categories: data.categories
      })
    }
  } */

  /* createPost = form => {
    form.preventDefault()
    const { postTitle, postBody, postAuthor, postCategory, cleanForm } = this.props

    if(postTitle !== '') {
      this.props.addPost({
        variables: {
          timestamp: 1467166872634,
          title: postTitle,
          body: postBody,
          author: postAuthor,
          category: postCategory
        },
        refetchQueries: [{
          query: ALL_POSTS
        }]
      }).then(({ data }) => {
        cleanForm()
        this.setState({
          postSuccess: true
        })
      }).catch((error) => console.log(error))
    }
  } */

  render() {
    const {
      updateFormTitle,
      updateFormBody,
      updateFormAuthor,
      handlerOnChange,
      postTitle,
      postAuthor,
      postCategory,
      postBody } = this.props

    const { data: { loading, post, categories }} = this.props
    const { title, author, body } = !loading && first(post)

    return (
      <div>
        <h1>Edit</h1>
        <div>
          <NavLink
            exact to='/'
            className='Header-navLink'
            activeClassName='Header-isActive'
          >
            Back to Home
          </NavLink>
          {!loading &&
            <form onSubmit={this.createPost}>
              <div>
                <input
                  className="form-control"
                  name="title"
                  value={postTitle}
                  placeholder="title"
                  onClick={evt => updateFormTitle(title)}
                  onChange={evt => updateFormTitle(evt.target.value)}
                />
              </div>
              <div>
                <input
                  className="form-control"
                  name="author"
                  value={author}
                  placeholder="author"
                  onChange={evt => updateFormAuthor(evt.target.value)}
                />
              </div>
              <div>
                {categories &&
                  <Select
                    name="category"
                    value={postCategory}
                    options={categories}
                    handlerOnChange={handlerOnChange}
                  />
                }
              </div>
              <div>
                <textarea
                  className="form-control"
                  name="body"
                  value={body}
                  onChange={evt => updateFormBody(evt.target.value)}
                  row="4"
                />
              </div>
              <div className="col-md-12 text-center">
                <button type="submit">EDIT POST</button>
              </div>
            </form>
          }
        </div>
      </div>
    )
  }
}

EditPost.propTypes = {
  updateFormTitle: PropsTypes.func.isRequired,
  updateFormAuthor: PropsTypes.func.isRequired,
  updateFormBody: PropsTypes.func.isRequired,
  handlerOnChange: PropsTypes.func.isRequired
}

const mapProps = ({ addPostReducer }) => addPostReducer

export default compose(
  connect(mapProps, actions),
  graphql(
    SINGLE_POST, {
      options: ({ match }) => ({
        variables: {
          id: match.params.id
        }
      })
    }
  ),
  //graphql(CATEGORIES),
  graphql(ADD_POSTS, {name: 'addPost'})
)(EditPost)
