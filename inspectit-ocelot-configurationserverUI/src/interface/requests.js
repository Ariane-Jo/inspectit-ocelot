function requestGET (source) {
  // source = source of file
  // TODO: Replace Mocking Data
  if (source === 'all') {
    return {
      id: 1,
      name: 'root',
      toggled: true,
      children: [
        {
          id: 2,
          name: 'parent',
          children: [
            { id: 3,
              name: 'child1' },
            { id: 4,
              name: 'child2' }
          ]
        },
        {
          id: 5,
          name: 'loading parent',
          loading: true,
          children: []
        },
        {
          id: 898,
          name: 'parent',
          children: [
            {
              id: 7,
              name: 'nested parent',
              children: [
                {
                  id: 8,
                  name: 'nested child 1' },
                { id: 9,
                  name: 'nested child 2' }
              ]
            }
          ]
        }
      ]
    }
  } else {
    // Suche nach file
    return { name: source, text: `${source} : Pretending to find something` }
  }

  // // Get for all
  // window.fetch('PlaceholderFILESORFOLDERS')
  //   .then(handleErrors)
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error))

  // // Get for a file
  // const data = {
  //   method: 'GET',
  //   body: JSON.stringify({ filename: inputFilename }),
  //   headers: {
  //    'Content-Type': 'application/json'
  //   }
  // }
  // window.fetch('Placeholder', data)
  //   .then(handleErrors)
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error))

  // // Get for a folder
  // const data = {
  //   method: 'GET',
  //   body: JSON.stringify({ folderName: inputFoldername }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
  // window.fetch('Placeholder', data)
  //   .then(handleErrors)
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error))
}

function requestPUT (source) {
  // TODO: Finish requestPut up
  // Put for file
  // const data = {
  //   method: 'PUT',
  //   body: JSON.stringify({fileName: inputFileName, text: inputText}),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
  // window,fetch('PlaceholderFile', data)
  //   .then(handleErrors)
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error))

  // // Put for a folder
  // const data = {
  //   method: 'PUT',
  //   body: JSON.stringify({folderName: inputFolderName}),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
}

// checking if file exists beforehand?
function requestDELETE (source) {
  // TODO: Finish requestDelete up
  // Delete for file
  // const data = {
  //   method: 'DELETE',
  //   body: JSON.stringify({fileName: inputFileName}),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
  // window,fetch('PlaceholderFile', data)
  //   .then(handleErrors)
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error))

  // // Delete for a folder
  // const data = {
  //   method: 'DELETE',
  //   body: JSON.stringify({folderName: inputFolderName}),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
}

function requestMOVE (oldSource, newSource) {
  // TODO: Finish requestMove up
  // Moving a file
  // const data = {
  //   method: 'Move',
  //   body: JSON.stringify({fileName: inputFileName, oldSource: oldSource, newSource: newSource}),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
  // window,fetch('PlaceholderFile', data)
  //   .then(handleErrors)
  //   .then(res => console.log(res))
  //   .catch(error => console.log(error))

  // // Moving a folder
  // const data = {
  //   method: 'PUT',
  //   body: JSON.stringify({folderName: inputFolderName, oldSource: oldSource, newSource: newSource),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
}

function handleErrors (res) {
  if (res.ok) return res.json()
  else return Error(res.statusText)
}

export { requestGET, requestPUT, requestDELETE, requestMOVE }
