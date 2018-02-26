import React from 'react'
import PropTypes from 'prop-types'
import Item from './item'

const List = ({ posts, remove }) => {
  return (
    <div>
      <h2>Posts:</h2>
      {posts.map(post => (
        <Item key={`post-${post.id}`} item={post} remove={remove} />
      ))}
    </div>
  )
}

List.propTypes = {
  posts: PropTypes.array.isRequired,
  remove: PropTypes.func
}

export default List
