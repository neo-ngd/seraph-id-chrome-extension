import '../../../assets/icons/icon128';

import { combineReducers } from 'redux';
import { wallet, claim, dialog, session, activeAccount } from './reducers';

export default combineReducers({
  wallet,
  claim,
  dialog,
  session,
  activeAccount
});
