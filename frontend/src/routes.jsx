import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './container/Main'
import Home from './container/Home'
import Post from './container/Post'
import AddPost from './container/Post/AddPost'

const Routes = () => (
  <BrowserRouter>
    <div>
      <main>
        <Main>
          <Route exact path='/' component={Home} />
          <Route path='/:category/:id' component={Post} />
          <Route path='/add-post' component={AddPost} />
        </Main>
      </main>
    </div>
  </BrowserRouter>
)

export default Routes
