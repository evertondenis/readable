import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Cell } from 'react-md'
import Item from './item'

const List = ({ title, posts, votePost, editPath, remove }) => {
  return (
    <Fragment>
      <Cell size={12}><h2>{title}</h2></Cell>
      {posts.map(post => (
        <Cell key={`post-${post.id}`} size={4} >
          <Item
            item={post}
            remove={remove}
            votePost={votePost}
          />
        </Cell>
      ))}
    </Fragment>
  )
}

List.propTypes = {
  title: PropTypes.string,
  posts: PropTypes.array.isRequired,
  edit: PropTypes.func,
  remove: PropTypes.func
}

export default List
