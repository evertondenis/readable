import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './container/Main'
import Home from './container/Home'
import Post from './container/Post'

const Routes = () => (
  <BrowserRouter>
    <div>
      <main>
        <Main>
          <Route exact path='/' component={Home} />
          <Route path='/post/:id' component={Post} />
        </Main>
      </main>
    </div>
  </BrowserRouter>
)

export default Routes
