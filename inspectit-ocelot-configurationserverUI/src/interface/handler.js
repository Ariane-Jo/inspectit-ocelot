import { requestGET } from './requests'

// TODO: Need to differenciate between file and folder
function handlerGet (fileName) {
  // happy path: object comes back
  const result = requestGET(fileName)
  return result
}

function handlerPut () {

}

function handlerDelete () {

}

function handlerMove () {

}

export { handlerGet, handlerPut, handlerDelete, handlerMove }
