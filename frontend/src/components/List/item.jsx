import React from 'react'
import { Link } from 'react-router-dom'
import { ItemStyled } from './styled'

const Item = ({ item }) => {
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
    </ItemStyled>
  )
}

export default Item
