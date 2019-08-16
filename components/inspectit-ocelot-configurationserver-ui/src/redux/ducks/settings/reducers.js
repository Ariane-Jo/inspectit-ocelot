import * as types from "./types";
import { createReducer } from "../../utils";
// import {settings as initialState} from '../initial-states'

const initialState = {
  loading: false,
  error: null,
  pendingRequests: 0,
  users: [],
  userFilter: ''
}

const settingsReducer = createReducer(initialState)({
  [types.CHANGE_PASSWORD_STARTED]: (state, action) => {
    return {
      ...state,
      loading: true
    }
  },
  [types.CHANGE_PASSWORD_FAILURE]: (state, action) => {
    const {error} = action.payload
    return {
      ...state,
      loading: false,
      error: error
    }
  },
  [types.CHANGE_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null
    }
  },
  [types.SEARCH_USER_STARTED]: (state, action) => {
    return {
      ...state,
      pendingRequests: state.pendingRequests + 1
    }
  },
  [types.SEARCH_USER_FAILURE]: (state, action) => {
    return {
      ...state,
      pendingRequests: state.pendingRequests - 1,
      users: []
    }
  },
  [types.SEARCH_USER_SUCCESS]: (state, action) => {
    const {users} = action.payload 
    return {
      ...state,
      pendingRequests: state.pendingRequests - 1,
      users: users
    }
  },
  [types.CHANGE_USER_FILTER]: (state, action) => {
    const {string} = action.payload
    return {
      ...state,
      userFilter: string
    }
  },
  [types.DELETE_USER_STARTED]: (state, action) => {
    return {
      ...state
    }
  },
  [types.DELETE_USER_FAILURE]: (state, action) => {
    return {
      ...state
    }
  },
  [types.DELETE_USER_SUCCESS]: (state, action) => {
    return {
      ...state
    }
  },
  [types.ADD_USER_STARTED]: (state, action) => {
    return {
      ...state
    }
  },
  [types.ADD_USER_FAILURE]: (state, action) => {
    return {
      ...state
    }
  },
  [types.ADD_USER_SUCCESS]: (state, action) => {
    return {
      ...state
    }
  },
})

export default settingsReducer