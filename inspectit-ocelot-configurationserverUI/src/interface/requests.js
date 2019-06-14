function requestGetData (fileName) {
  // string could be all or a specific file name I suppose? Porbably depends on the server
  if (fileName === 'all') {
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
    return { name: fileName, text: 'Pretending to find something' }
  }
}

function requestSave (fileName) {
  // Could be new folder, file or saving content of a file
  // = update or add
}

// checking if file exists beforehand?
function requestDelete (fileName) {
  // Could be folder or file
}

export { requestGetData }
