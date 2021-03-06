import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { MenuButton } from 'react-md'
import map from 'lodash/map'

class ToggleCategories extends PureComponent {

  renderCategories = () => {
    const { categories } = this.props
    return (
      map(categories, item => (
        <Link className="item-category" key={`category-${item.name}`} to={`/${item.name}`} >{item.name}</Link>)
      )
    )
  }

  render() {
    return (
      <MenuButton
        id="categories"
        anchor={{
          x: MenuButton.HorizontalAnchors.INNER_LEFT,
          y: MenuButton.VerticalAnchors.TOP,
        }}
        position={MenuButton.Positions.TOP_LEFT}
        flat
        primary
        menuItems={this.renderCategories()}
      >
        Categories
      </MenuButton>
    )
  }
}

export default ToggleCategories
