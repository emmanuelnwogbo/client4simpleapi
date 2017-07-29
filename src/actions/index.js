import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, callback) {
  //we return a function instead of an object because we're using redux-thunk
  //while using redux-thunk a function also becomes valid data to return
  return function(dispatch) {
    //Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        //if request is good...
        //-Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        //- Save the JWT token
        localStorage.setItem('token', response.data.token);
        //-redirect to the route '/feature'
        callback();
      })
      .catch(() => {
        //if request is bad...
        //-Show an error to the user
        dispatch(authError('Bad Login Info'));
      })
  }
}

export function authError(error) {
  console.log(error);
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

export function signupUser({email, password}, callback) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password})
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);

        callback();
      })
      .catch(response => dispatch(authError('user already exists')));
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}

//an implementation of the above code with redux promise instead of redux thunk
/*export function fetchMessage() {
  const request = axios.get(ROOT_URL, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: FETCH_MESSAGE,
    payload: request
  }
}*/
