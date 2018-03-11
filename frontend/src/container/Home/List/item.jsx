import React from 'react'
import PropTypes from 'prop-types'
import { ItemStyled } from './styled'


const Item = ({ item, children }) => {
  return (
    <ItemStyled>
      { children }
    </ItemStyled>
  )
}

Item.propTypes = {
  children: PropTypes.any.isRequired
}

export default Item
