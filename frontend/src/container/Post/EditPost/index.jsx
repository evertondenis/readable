import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import first from 'lodash/first'
import { SINGLE_POST, CATEGORIES } from './queries'
import FormEdit from './form'

class EditPost extends Component {

  render() {
    const { singlePost: { loading, post } } = this.props
    const currentPost = !loading && first(post)

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
          {!loading && <FormEdit data={currentPost} />}
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(
    SINGLE_POST, {
      options: ({ match }) => ({
        variables: {
          id: match.params.id
        }
      }),
      name: 'singlePost'
    }
  ),
  graphql(CATEGORIES, {name: 'categories'})
)(EditPost)
