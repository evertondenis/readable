import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ item }) => {
  return (
    <Link key={`post-${item.id}`} to={`/post/${item.id}`} className='Home-link'>
      {item.title}
    </Link>
  )
}

export default Item
