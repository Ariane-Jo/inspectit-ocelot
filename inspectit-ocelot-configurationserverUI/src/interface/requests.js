function mockingGet (path) {
  if (path === 'all') {
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
              name: 'child1',
              content: 'Text for child 1' },
            { id: 4,
              name: 'child2',
              content: 'Text for child 2' }
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
                  name: 'nested child 1',
                  content: 'Text for child 3' },
                { id: 9,
                  name: 'nested child 2',
                  content: 'Text for child 4' }
              ]
            }
          ]
        }
      ]
    }
  } else {
    // Suche nach file
    return { name: path, text: `${path} : Pretending to find something` }
  }
}

// Authorization for testing: admin:admin
function requestGET (path, auth) {
  // super simple error handling for now
  if (!path.includes('localhost:8090/api/v1/')) {
    console.log(`Path: ${path} is definitely wrong`)
    return
  }

  // includes data for request
  const data = {
    headers: new Headers({
      'Authorization': `Basic ${window.btoa(`${auth.login}:${auth.password}`)}`
    })
  }
  // actual request to server
  let res = window.fetch(path, data)
    .then(handleErrors)
    .then(res => console.log(res))
    .catch(error => console.log(error))

  /* Outcome
    [
    {
        "type": "file",
        "path": "file2"
    },
    {
        "type": "directory",
        "path": "test"
    },
    {
        "type": "directory",
        "path": "test/abc"
    }
    ]
    */

  // returns promise
  return res
}

function requestPUT (path, auth, content) {
  if (!path.includes('localhost:8090/api/v1/')) {
    console.log(`Path: ${path} is definitely wrong`)
    return
  }

  // path already includes directory/file name ---
  // TODO: is body.text right?
  // TODO: Checking if sending content for directories result in a problem (works in postman)
  const data = {
    method: 'PUT',
    body: JSON.stringify({ text: content }),
    headers: new Headers({
      'Authorization': `Basic ${window.btoa(`${auth.login}:${auth.password}`)}`
    })
  }

  let res = window.fetch(path, data)
    .then(handleErrors)
    .then(res => console.log(res))
    .catch(error => console.log(error))

  return res
}

function requestDELETE (path, auth) {
  if (!path.includes('localhost:8090/api/v1/')) {
    console.log(`Path: ${path} is definitely wrong`)
    return
  }

  const data = {
    method: 'DELETE',
    headers: new Headers({
      'Authorization': `Basic ${window.btoa(`${auth.login}:${auth.password}`)}`
    })
  }

  let res = window.fetch(path, data)
    .then(handleErrors)
    .then(res => console.log(res))
    .catch(error => console.log(error))

  return res
}

// TODO: Looking up how request should look like
function requestMOVE (oldPath, newPath, auth) {
  if (!oldPath.includes('localhost:8090/api/v1/') || !newPath.includes('localhost:8090/api/v1/')) {
    console.log(`Path: ${oldPath} or ${newPath} is definitely wrong`)
    return
  }

  const data = {
    method: 'DELETE',
    body: JSON.stringify({ newPath: newPath }),
    headers: new Headers({
      'Authorization': `Basic ${window.btoa(`${auth.login}:${auth.password}`)}`
    })
  }

  let res = window.fetch(oldPath, data)
    .then(handleErrors)
    .then(res => console.log(res))
    .catch(error => console.log(error))

  return res
}

function handleErrors (res) {
  if (res.ok) return res.json()
  else return Error(res.statusText)
}

export { mockingGet, requestGET, requestPUT, requestDELETE, requestMOVE }
