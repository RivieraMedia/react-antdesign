import { combineReducers } from 'redux';

import getAllUsers from './getAllUser';
import userAuth from './userAuth';
const rootReducer = combineReducers({
  getAllUsers: getAllUsers,
  userAuth: userAuth
});

export default rootReducer;