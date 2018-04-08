import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, FontIcon } from 'react-md'
import HeaderStyled from './styled'


class Header extends PureComponent {

  render() {
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
        </ul>
      </HeaderStyled>
    )
  }
}

export default Header
