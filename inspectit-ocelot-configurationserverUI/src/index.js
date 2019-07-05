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

let node = { id: 'test/abc' }
handlerGet(node)

window.fetch('http://localhost:8090/api/v1/directories')
  .then(res => console.log(res.status))
  .catch(error => console.log('ERROR:' + error))
