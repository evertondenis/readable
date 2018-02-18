import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './container/Home'
import Post from './container/Post'

const Routes = () => (
  <Router>
    <div>
      <main>
        <Route exact path='/' component={Home} />
        <Route path='/post/:id' component={Post} />
      </main>
    </div>
  </Router>
)

export default Routes
