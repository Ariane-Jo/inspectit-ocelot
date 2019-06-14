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
}

function requestPUT (source) {
  // TODO: Replace Mocking Data
}

// checking if file exists beforehand?
function requestDELETE (source) {
  // TODO: Replace Mocking Data
}

function requestMOVE (oldSource, newSource) {
  // TODO: Replace Mocking Data
}

export { requestGET, requestPUT, requestDELETE, requestMOVE }
