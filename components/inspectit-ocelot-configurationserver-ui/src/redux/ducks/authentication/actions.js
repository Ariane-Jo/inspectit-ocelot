import * as types from "./types";
import {axiosPlain} from '../../../lib/axios-api';

import {configurationActions} from '../configuration';

/**
 * Fetches an access token for the given credentials.
 * 
 * @param {string} username 
 * @param {string} password 
 */
export const fetchToken = (username, password) => {
    return dispatch => {
        dispatch(fetchTokenStarted());

        axiosPlain
            .get("/account/token", {
                auth: {
                    username: username,
                    password: password
                }
            })
            .then(res => {
                const token = res.data;
                dispatch(fetchTokenSuccess(token, username));
            })
            .catch(err => {
                let message;
                const { response } = err;
                if (response && response.status == 401) {
                    message = "The given credentials are not valid.";
                } else {
                    message = err.message;
                }
                dispatch(fetchTokenFailure(message));
            });
    };
};

/**
 * Is dispatched when the fetching of the access token has been started.
 */
export const fetchTokenStarted = () => ({
    type: types.FETCH_TOKEN_STARTED
});

/**
 * Is dispatched if the fetching of the access token was not successful.
 * 
 * @param {*} error 
 */
export const fetchTokenFailure = (error) => ({
    type: types.FETCH_TOKEN_FAILURE,
    payload: {
        error
    }
});

/**
 * Is dispatched when the fetching of the access token was successful.
 * 
 * @param {string} token 
 */
export const fetchTokenSuccess = (token, username) => ({
    type: types.FETCH_TOKEN_SUCCESS,
    payload: {
        token,
        username
    }
});

/**
 * Logout of the current user.
 */
export const logout = () => {
    return dispatch => {
        dispatch({type: types.LOGOUT});
        dispatch(configurationActions.resetState());
    };
};