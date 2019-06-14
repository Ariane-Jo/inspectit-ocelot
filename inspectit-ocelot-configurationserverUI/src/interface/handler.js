import { requestGetData } from './requests'

function handlerGet (fileName) {
  // happy path: object comes back
  const result = requestGetData(fileName)
  addIdToData(result)
  console.log('I did something')
  return result
}

function addIdToData (node, parentName) {
  // Id of Root shall be 0
  if (!parentName) {
    node.id = 0
    parentName = 0
  }
  // adding id to each child as parentId:childIndex
  if (node.children) {
    node.children.forEach((element, index) => {
      element.id = parentName + ':' + index
      addIdToData(element, element.id)
    })
  }
}

export { handlerGet }
