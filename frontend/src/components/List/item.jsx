import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'react-md'
import { Link } from 'react-router-dom'
import { ItemStyled } from './styled'


const Item = ({ item, votePost, remove }) => {
  return (
    <Card className="md-block-centered">
      <Link to={`/${item.category}/${item.id}`} className='post-link'>
        <CardTitle title={item.title} />
      </Link>
      <CardText>
        <p>Author: {item.author}</p>
        <p>Category: {item.category}</p>
        <div>
          <p>Comments: {item.commentCount}</p>
        </div>
        <span>Score: {item.voteScore}</span>
        <div>
          <button onClick={() => votePost(item.id, 'upVote')} >UP</button>
          <button onClick={() => votePost(item.id, 'downVote')} >DOWN</button>
        </div>
        <div>
          <Link to={`/post/edit/${item.id}`} className='edit-post'>edit</Link>
          <button onClick={() => remove(item.id)} >delete</button>
        </div>
      </CardText>
    </Card>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  votePost: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Item
