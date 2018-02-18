import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import Home from './container/Home'
import Post from './container/Post'

const Routes = () => (
  <Router>
    <div>
      <main>
        <NavLink
          exact to='/'
          className='Header-navLink'
          activeClassName='Header-isActive'
        >
          Home
        </NavLink>
        <Route exact path='/' component={Home} />
        <Route path='/post/:id' component={Post} />
      </main>
    </div>
  </Router>
)

export default Routes
