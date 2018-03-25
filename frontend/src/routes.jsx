import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from './container/Main'
import Home from './container/Home'
import Post from './container/Post'
import AddPost from './container/Post/AddPost'
import EditPost from './container/Post/EditPost'
import NotFound from './container/NotFound'


const Routes = () => (
  <Router>
    <div>
      <main>
        <Main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/post/add' component={AddPost} />
            <Route path='/post/edit/:id' component={EditPost} />
            <Route path='/:category/:id' component={Post} />
            <Route path="/404" component={NotFound} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Main>
      </main>
    </div>
  </Router>
)

export default Routes
