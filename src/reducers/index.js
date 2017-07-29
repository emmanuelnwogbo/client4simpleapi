import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form' //step 3 in redux form set up
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form, //step 4 in redux form set up
  auth: authReducer
});

export default rootReducer;
