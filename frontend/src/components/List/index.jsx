import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class List extends Component {
  render() {
    const { items, onClick } = this.props

    console.log(this.props)

    return (
      <div>
        {items.map(item => <a key={item.id} onClick={() => onClick(item.id)}>{item.title}</a>)}
      </div>
    )
  }
}

const POST_QUERY = gql`query PostById($id: ID) {
  postById(id: $id) {
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

export default graphql(POST_QUERY, { name: 'postById' })(List)

//export default List
