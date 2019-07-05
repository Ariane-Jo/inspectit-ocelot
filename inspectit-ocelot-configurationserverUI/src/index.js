import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from '@material-ui/core'
import TreeView from './components/TreeView'
import { handlerGet } from './interface/handler'

function App () {
  return (
    <Container maxWidth='xl'>
      <TreeView />
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
