import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Item from './item'

const List = ({ title, posts, votePost, remove }) => {
  return (
    <div>
      <h2>{title}:</h2>
      {posts.map(post => (
        <Item key={`post-${post.id}`} item={post} remove={remove} >
          <p>
            <Link to={`/post/${post.id}`} className='Home-link'>
              {post.title}
            </Link>
          </p>
          <p>Author: {post.author}</p>
          <p>
            <span>Score: {post.voteScore}</span>
            <span><button onClick={() => votePost(post.id, 'upVote')} >UP</button></span>
            <span><button onClick={() => votePost(post.id, 'downVote')} >DOWN</button></span>
          </p>
          <p>Comments: {post.commentCount}</p>
          <p><button onClick={() => remove(post.id)} >delete</button></p>
        </Item>
      ))}
    </div>
  )
}

List.propTypes = {
  title: PropTypes.string,
  posts: PropTypes.array.isRequired,
  remove: PropTypes.func
}

export default List
