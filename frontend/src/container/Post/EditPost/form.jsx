import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { CATEGORIES } from './queries'
import Select from '../../../components/Form/Select'

class FormEdit extends Component {

  state = {
    postTitle: this.props.data.title,
    postAuthor: this.props.data.author,
    postCategory: this.props.data.category,
    postBody: this.props.data.body,
  }

  updateFormTitle = postTitle => {
    this.setState({ postTitle })
  }

  updateFormAuthor = postAuthor => {
    this.setState({ postAuthor })
  }

  updateFormBody = postBody => {
    this.setState({ postBody })
  }

  handlerOnChange = postCategory => {
    this.setState({ postCategory })
  }

  editPost = form => {
    form.preventDefault()
    const { postTitle, postAuthor, postCategory, postBody } = this.state

    console.log(postTitle)
    console.log(postAuthor)
    console.log(postCategory)
    console.log(postBody)

    /* if(postTitle !== '') {
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
    } */
  }

  render() {
    const { categories: { loading, categories } } = this.props
    const {
      postTitle,
      postAuthor,
      postCategory,
      postBody
    } = this.state

    console.log('category', postCategory)

    return (
      <form onSubmit={this.editPost}>
        <div>
          <input
            className="form-control"
            name="title"
            value={postTitle}
            placeholder="title"
            onChange={evt => this.updateFormTitle(evt.target.value)}
          />
        </div>
        <div>
          <input
            className="form-control"
            name="author"
            value={postAuthor}
            placeholder="author"
            onChange={evt => this.updateFormAuthor(evt.target.value)}
          />
        </div>
        <div>
          {(!loading && categories) && (
            <Select
              name="category"
              value={postCategory}
              options={categories}
              handlerOnChange={this.handlerOnChange}
            />
          )}
        </div>
        <div>
          <textarea
            className="form-control"
            name="body"
            value={postBody}
            onChange={evt => this.updateFormBody(evt.target.value)}
            row="4"
          />
        </div>
        <div className="col-md-12 text-center">
          <button type="submit">EDIT POST</button>
        </div>
      </form>
    )
  }
}

export default compose(
  graphql(CATEGORIES, {name: 'categories'})
)(FormEdit)
