import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyledNotfound } from './styled'

const Notfound = () => (
  <StyledNotfound>
    <NavLink
      exact to='/'
      className='Header-navLink'
      activeClassName='Header-isActive'
    >
      Back to Home
    </NavLink>
    <div className="container">
      <h1>Page not Found ;(</h1>
    </div>
  </StyledNotfound>
)

export default Notfound
