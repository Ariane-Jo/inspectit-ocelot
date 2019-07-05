import { mockingGet, requestGET, requestPUT, requestDELETE, requestMOVE } from './requests'

// TODO: Need to differenciate between file and folder
function mockHandlerGet (fileName) {
  // happy path: object comes back
  // TODO: replace
  const result = mockingGet(fileName)
  return result
}

function handlerGet (node) {
  let path = ''
  let auth = {}
  if (node.children) {
  // path === id
    path = `http://localhost:8090/api/v1/directories/${node.id}`
    auth.login = 'admin'
    auth.password = 'admin'
  } else {
    path = `http://localhost:8090/api/v1/files/${node.id}`
    auth.login = 'dummy'
    auth.password = 'dummy'
  }

  let res = requestGET(path, auth)
    .then(res =>
      console.log(res)
      // convert to node
    )
}

function handlerPut (node) {
  let path = ''
  let auth = {}
  let content = ''
  if (node.children) {
  // path === id
    path = `http://localhost:8090/api/v1/directories/${node.id}`
    auth.login = 'admin'
    auth.password = 'admin'
  } else {
    path = `http://localhost:8090/api/v1/files/${node.id}`
    content = node.content
    auth.login = 'dummy'
    auth.password = 'dummy'
  }

  let res = requestPUT(path, auth, content)
    .then(res =>
      console.log(res)
      // convert to node
    )
}

function handlerDelete (node) {
  let path = ''
  let auth = {}
  if (node.children) {
  // path === id
    path = `http://localhost:8090/api/v1/directories/${node.id}`
    auth.login = 'admin'
    auth.password = 'admin'
  } else {
    path = `http://localhost:8090/api/v1/files/${node.id}`
    auth.login = 'dummy'
    auth.password = 'dummy'
  }

  let res = requestDELETE(path, auth)
    .then(res =>
      console.log(res)
    // can be okay or not
    )
}

function handlerMove (node) {
  let oldpath = ''
  let newPath = ''
  let auth = {}
  if (node.children) {
  // path === id
    oldpath = ''
    newPath = `http://localhost:8090/api/v1/directories/${node.id}`
    auth.login = 'admin'
    auth.password = 'admin'
  } else {
    oldpath = ''
    newPath = `http://localhost:8090/api/v1/files/${node.id}`
    auth.login = 'dummy'
    auth.password = 'dummy'
  }

  let res = requestMOVE(oldpath, newPath, auth)
    .then(res =>
      console.log(res)
    // can be okay or not?
    )
}

export { mockHandlerGet, handlerGet, handlerPut, handlerDelete, handlerMove }
