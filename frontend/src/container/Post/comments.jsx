import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
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
    const { data: { loading, comments } } = this.props
    const hasComments = !loading && comments

    return (
      <div>
        {loading && <p>Loading...</p>}
        <h2>Comments:</h2>
        {(!loading && !isEmpty(hasComments)) && (
          map(hasComments, comment => this.renderComments(comment))
        )}
      </div>
    )
  }
}

const AllComments = gql`
  query comments($parentId: String!) {
    comments: comments(parentId: $parentId) {
      id
      parentId
      body
      author
      voteScore
      deleted
      parentDeleted
    }
  }
`

export default graphql(AllComments)(Comments)
