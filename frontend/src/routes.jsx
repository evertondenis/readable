import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './container/Home'
import Post from './container/Post'

const Routes = () => (
  <BrowserRouter>
    <div>
      <main>
        <Route exact path='/' component={Home} />
        <Route path='/post/:id' component={Post} />
      </main>
    </div>
  </BrowserRouter>
)

export default Routes
