import React, { Component } from 'react'
import Home from '../Home'
import { Header } from './styled'
import '../../core/assets/style'

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Header className="App-header">
          <h1 className="App-title">Welcome to Readable App</h1>
        </Header>
        <Home />
      </div>
    )
  }
}

export default Main
