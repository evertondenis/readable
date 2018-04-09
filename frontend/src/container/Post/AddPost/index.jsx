import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { actions } from './store/actions'
import { ALL_POSTS, CATEGORIES, ADD_POSTS } from './queries'
import Select from 'components/Form/Select'

class CreatePost extends Component {

  componentWillReceiveProps(nextProps) {
    const loading = nextProps.data.loading
    const data = nextProps.data

    if(!loading){
      this.setState({
        categories: data.categories
      })
    }
  }

  createPost = form => {
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
        this.props.history.goBack()
      }).catch((error) => console.log(error))
    }
  }

  render() {
    const {
      data: { categories },
      updateFormTitle,
      updateFormBody,
      updateFormAuthor,
      handlerOnChange,
      postTitle,
      postAuthor,
      postCategory,
      postBody } = this.props

    return (
      <div>
        <form onSubmit={this.createPost}>
          <div>
            <input
              className="form-control"
              name="title"
              value={postTitle}
              placeholder="title"
              onChange={evt => updateFormTitle(evt.target.value)}
              autoFocus
            />
          </div>
          <div>
            <input
              className="form-control"
              name="author"
              value={postAuthor}
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
              value={postBody}
              onChange={evt => updateFormBody(evt.target.value)}
              row="4"
            />
          </div>
          <div className="col-md-12 text-center">
            <button type="submit">ADD POST</button>
          </div>
        </form>
      </div>
    )
  }
}

CreatePost.propTypes = {
  updateFormTitle: PropsTypes.func.isRequired,
  updateFormAuthor: PropsTypes.func.isRequired,
  updateFormBody: PropsTypes.func.isRequired,
  handlerOnChange: PropsTypes.func.isRequired
}

const mapProps = ({ addPostReducer }) => addPostReducer

export default compose(
  connect(mapProps, actions),
  graphql(CATEGORIES),
  graphql(ADD_POSTS, {name: 'addPost'})
)(CreatePost)
