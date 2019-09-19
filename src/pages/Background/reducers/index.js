import { combineReducers } from 'redux';

import { wallet, password } from './reducers';

export default combineReducers({
  wallet,
  password,
});
