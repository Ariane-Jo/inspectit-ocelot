import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Typography } from '@material-ui/core'
import TreeView from './components/TreeView'

function App () {
  return (
    <Container maxWidth='sm'>
      <Typography align='center'>Hallo</Typography>
      <TreeView />
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
