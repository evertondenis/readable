import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText, Button, FontIcon } from 'react-md'
import { Link } from 'react-router-dom'


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
          <Button icon primary onClick={() => votePost(item.id, 'upVote')}>thumbs_up</Button>
          <Button icon primary onClick={() => votePost(item.id, 'downVote')}>thumbs_down</Button>
          <Button icon primary>
            <Link to={`/post/edit/${item.id}`}>edit</Link>
          </Button>
          <Button icon primary onClick={() => remove(item.id)}>delete</Button>
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
