import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import AddComment from './addComment'
import { ALL_COMMENTS } from './queries'
import { StyledComments } from './styled'


class Comments extends Component {

  renderComments = ({ id, body, author }) => {
    return (
      <StyledComments key={id}>
        <p>{body}</p>
        <p><span>author: </span>{author}</p>
      </StyledComments>
    )
  }

  render() {
    const { data: { loading, comments }, parentId } = this.props
    const hasComments = !loading && comments

    return (
      <div>
        {loading && <p>Loading...</p>}
        <h2>Comments:</h2>
        {(!loading && !isEmpty(hasComments)) && (
          map(hasComments, comment => this.renderComments(comment))
        )}
        <AddComment parentId={parentId} />
      </div>
    )
  }
}


export default graphql(ALL_COMMENTS)(Comments)
