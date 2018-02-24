import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './container/Main'
import Post from './container/Post'

const Routes = () => (
  <BrowserRouter>
    <div>
      <main>
        <Route exact path='/' component={Main} />
        <Route path='/post/:id' component={Post} />
      </main>
    </div>
  </BrowserRouter>
)

export default Routes
