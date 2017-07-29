import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
  //I defaulted the state to an object for the simple that this stateis going
  //to have several different properties that we'll want to keep track of...
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true}
    case UNAUTH_USER:
      return { ...state, authenticated: false}
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload};
  }

  return state;
}
