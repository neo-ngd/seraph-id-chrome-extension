import '../../../assets/icons/icon128';

import { combineReducers } from 'redux';

import { wallet, password, claim, dialog, error } from './reducers';

export default combineReducers({
  wallet,
  password,
  claim,
  dialog,
  error
});
