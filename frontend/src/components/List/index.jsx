import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Item from './item'

const List = ({ title, posts, votePost, editPath, remove }) => {
  return (
    <div>
      <h2>{title}:</h2>
      {posts.map(post => (
        <Item key={`post-${post.id}`} item={post} remove={remove} >
          <p>
            <Link to={`/${post.category}/${post.id}`} className='Home-link'>
              {post.title}
            </Link>
          </p>
          <p>Author: {post.author}</p>
          <p>Category: {post.category}</p>
          <div>
            <p>Comments: {post.commentCount}</p>
          </div>
          <span>Score: {post.voteScore}</span>
          <div>
            <button onClick={() => votePost(post.id, 'upVote')} >UP</button>
            <button onClick={() => votePost(post.id, 'downVote')} >DOWN</button>
          </div>
          <div>
            <Link to={`/post/edit/${post.id}`} className='edit-post'>edit</Link>
            <button onClick={() => remove(post.id)} >delete</button>
          </div>
        </Item>
      ))}
    </div>
  )
}

List.propTypes = {
  title: PropTypes.string,
  posts: PropTypes.array.isRequired,
  edit: PropTypes.func,
  remove: PropTypes.func
}

export default List
