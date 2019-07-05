import { mockingGet, requestGET } from './requests'

// TODO: Need to differenciate between file and folder
function mockHandlerGet (fileName) {
  // happy path: object comes back
  // TODO: replace
  const result = mockingGet(fileName)
  return result
}

function handlerGet (node) {
  let path = ''
  if (node.children) { path = `http://localhost:8090/api/v1/directories/${node.id}` } // path === id
  else { path = `http://localhost:8090/api/v1/files/${node.id}` }
  let res = requestGET(path) // directories come back
  console.log(res)
}

function handlerPut () {

}

function handlerDelete () {

}

function handlerMove () {

}

export { mockHandlerGet, handlerGet, handlerPut, handlerDelete, handlerMove }
