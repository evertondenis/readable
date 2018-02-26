import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ItemStyled } from './styled'

const Item = ({ item, remove }) => {
  return (
    <ItemStyled>
      <p>
        <Link to={`/post/${item.id}`} className='Home-link'>
          {item.title}
        </Link>
      </p>
      <p>Author: {item.author}</p>
      <p><span>Comments: {item.commentCount}</span> | <span>Score: {item.voteScore}</span></p>
      <p><span>UP</span> - <span>DOWN</span></p>
      {/* <p><button onClick={remove(item.id)} >delete</button></p> */}
    </ItemStyled>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  remove: PropTypes.func
}

export default Item
