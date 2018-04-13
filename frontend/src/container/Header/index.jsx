import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CATEGORIES} from 'graphql/queries'
import { Button, FontIcon } from 'react-md'
import ToggleCategories from './categories'
import HeaderStyled from './styled'


const Header = ({ categories: { loading, categories }}) => {
  return (
    <HeaderStyled>
      <ul>
        <li>
          <Link to="/">
            <Button flat ><FontIcon primary>home</FontIcon></Button>
          </Link>
        </li>
        <li>
          <Link to="/post/add" ><Button flat >ADD POST</Button></Link>
        </li>
        <li>{!loading && <ToggleCategories categories={categories} />}</li>
      </ul>
    </HeaderStyled>
  )
}

export default compose(
  graphql(CATEGORIES, { name: 'categories' })
)(Header)
