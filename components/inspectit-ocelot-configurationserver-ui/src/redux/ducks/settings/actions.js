import * as types from './types'
import {axiosPlain} from '../../../lib/axios-api'
import axiosBearer from '../../../lib/axios-api'

//TODO: function is unfinished
export const changePassword = (username, oldPassword, newPassword) => {
  return dispatch => {
    dispatch({ type: types.CHANGE_PASSWORD_STARTED })

    axiosPlain
      .put('/account/password', {
          password : newPassword
        },{
        auth: {
          username: username,
          password: oldPassword
        }
      })
      .then(res => { dispatch({ type: types.CHANGE_PASSWORD_SUCCESS }) })
      .catch(e => { 
        console.log('error')
        console.log(e.message)
        const { response } = e
        console.log('response')
        console.log(response)
        dispatch({ type: types.CHANGE_PASSWORD_FAILURE, payload: { error: e.message } }) })
  }
}

export const searchUser = (param) => {
  return dispatch => {
    dispatch({ type: types.SEARCH_USER_STARTED })

    //define query path
    let parsed = parseInt(param)
    let path = ''
    if(param && isNaN(parsed)){ path=`?username=${param}` } 
    else if(param){ path=`/${param}` }

    axiosBearer
      .get(`/users${path}`)
      .then(res => {
        if(Array.isArray(res.data)){
          var data = res.data
        } else {
          var data = [res]
        }
        let users = prepareUsers(data)
        dispatch({ type: types.SEARCH_USER_SUCCESS, payload: { users: users } })
        console.log('Search User Success beendet')
       })
      .catch(e => {
        dispatch({ type: types.SEARCH_USER_FAILURE })
      })

    // fetch(`http://localhost:8090/api/v1/users${path}`, {
    //   method: 'GET',
    //   headers: new Headers({
    //     "Authorization": `Basic ${window.btoa(`${'admin'}:${'admin'}`)}`
    //   })
    // })
    //   .then(res => {return res.json()})
    //   .then(res => {
    //     // console.log(res)
    //     if(Array.isArray(res)){
    //       var users = res
    //     } else {
    //       var users = [res]
    //     }
    //     dispatch(searchUserByNameSuccess(users))
    //   })
    //   .catch(error => {
    //     // console.log(error)
    //     let message
    //     if(error.status === 401) {
    //       message = "The password you entered was incorrect"
    //     } else {
    //       //TODO: there is no error.message as of now
    //       message = error.message;
    //     }
    //     dispatch(searchUserByNameFailure(message))
    //   })
  }
}

const prepareUsers = (users) => {
  let res = []
  res.push({
    head: true,
    id: 'ID',
    username: 'Username',
    password: 'Password',
    role: 'Role'
  })
  res.push({
    newUser: true,
    id: 'edit',
    username: 'edit',
    password: 'edit',
    role: 'edit'
  })
  users.forEach(element => {
    res.push(
      {
        id: element.id,
        username: element.username,
        role: 'admin'
      }
    )
  });
  return res
}

export const changeUserFilter = (string = '') => ({
  type: types.CHANGE_USER_FILTER,
  payload: { string }
});

export const deleteUser = (id) =>{
  return dispatch => {
    dispatch({type: types.DELETE_USER_STARTED})

    axiosBearer
      .delete(`/users/${id}`)
      .then(res => { 
        dispatch({ type: types.DELETE_USER_SUCCESS })
        dispatch(searchUser())
      })
      .catch(e => { dispatch({ type: types.DELETE_USER_FAILURE }) })

    // fetch(`http://localhost:8090/api/v1/users/${id}`, {
    //   method: 'DELETE',
    //   headers: new Headers({
    //     "Authorization": `Basic ${window.btoa(`${'admin'}:${'admin'}`)}`
    //   })
    // })
    //   // .then(res => {return res.json()})
    //   .then(res => {
    //     console.log('then ' + res)
    //     if(!res.ok){
    //       throw new Error(res)
    //     }
    //     dispatch(deleteUserSuccess())
    //   })
    //   .catch(error => {
    //     console.log('error: ' + error)
    //     // let message
    //     // if(error.status === 401) {
    //     //   message = "The password you entered was incorrect"
    //     // } else {
    //     //   //TODO: there is no error.message as of now
    //     //   message = error.message;
    //     // }
    //     dispatch(deleteUserFailure())
    //   })
  }
}

export const addUser = (userObj) => {
  return dispatch => {
    dispatch({ type: types.ADD_USER_STARTED })

    axiosBearer
      .post('/users', {
        username: userObj.username,
        password: userObj.password
      })
      .then(res => {
        dispatch({ type: types.ADD_USER_SUCCESS })
        dispatch(searchUser())
      })
      .catch(e => {dispatch({ type: types.ADD_USER_FAILURE }) })
  }
}