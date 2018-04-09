import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CATEGORIES} from 'graphql/queries'
import { Button, FontIcon } from 'react-md'
import map from 'lodash/map'
import ToggleCategories from './categories'
import HeaderStyled from './styled'


class Header extends PureComponent {

  renderCategories = item => {
    return (
      <li key={`cat-${item.path}`}>
        <Link to={`/${item.name}`} ><Button flat >{item.name}</Button></Link>
      </li>
    )
  }

  render() {
    const { categories: { loading, categories }} = this.props

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
          {!loading && (
            map(categories, item => this.renderCategories(item))
          )}
        </ul>
      </HeaderStyled>
    )
  }
}

export default compose(
  graphql(CATEGORIES, { name: 'categories' })
)(Header)
