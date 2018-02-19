import React from 'react'
import PropTypes from 'prop-types'
import Item from './item'

const List = ({ posts }) => {
  return (
    <div>
      <h2>Posts:</h2>
      {posts.map(post => (
        <Item key={post.id} item={post}/>
      ))}
    </div>
  )
}

List.propTypes = {
  posts: PropTypes.array.isRequired
}

export default List
