import React from 'react'
import { Header } from './styled'
import '../../core/assets/style/main.css'

const Main = ({ children }) => (
  <div className="container">
    <Header className="App-header">
      <h1 className="App-title">...</h1>
    </Header>
    { children }
  </div>
)

export default Main
