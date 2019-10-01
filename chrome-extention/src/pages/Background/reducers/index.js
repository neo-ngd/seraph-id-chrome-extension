import '../../../assets/icons/icon128';

import { combineReducers } from 'redux';

import { wallet, claim, dialog, error, hash, session } from './reducers';

export default combineReducers({
  wallet,
  claim,
  dialog,
  error,
  hash,
  session
});
