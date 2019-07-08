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

// Test
let path = 'http://localhost:8090/api/v1/directories/'
let login = 'admin'
let password = 'password'

const data = {
  headers: new Headers({
    'Authorization': `Basic ${window.btoa(`${login}:${password}`)}`
  })
}
// actual request to server
window.fetch(path, data)
  .then(res => console.log(res))
  .catch(error => console.log(error))
