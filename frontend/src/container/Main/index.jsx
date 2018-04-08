import React from 'react'
import 'core/assets/style/main.css'

import { Container } from './styled.js'

const Main = ({ children }) => (
  <Container>
    { children }
  </Container>
)

export default Main
