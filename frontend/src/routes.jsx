import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './container/Main'
import Home from './container/Home'
import Post from './container/Post'
import AddPost from './container/Post/AddPost'
import NotFound from './container/NotFound'

/* const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
) */

const Routes = () => (
  <BrowserRouter>
    <div>
      <main>
        <Main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/:category/:id' component={Post} />
            <Route path='/add-post' component={AddPost} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Main>
      </main>
    </div>
  </BrowserRouter>
)

export default Routes
