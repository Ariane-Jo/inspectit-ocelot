import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Grid } from '@material-ui/core'
import TreeView from './components/TreeView'
import Editor from './components/Editor'

function App () {
  return (
    <Container maxWidth='xl'>
      <Grid container justify='center' spacing={2}>
        <Grid item xs={6}>
          <TreeView />
        </Grid>
        <Grid item xs={6}>
          <Editor />
        </Grid>
      </Grid>
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
