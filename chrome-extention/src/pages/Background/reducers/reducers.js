import { SET_PASSPORT, SET_WALLET } from '../actionTypes';

export const wallet = (state = null, action) => {
  switch (action.type) {
    case SET_WALLET:
      return action.wallet ? action.wallet : action.exportedWalletJSON;
    default:
      return state;
  }
};
export const password = (state = null, action) => {
  switch (action.type) {
    case SET_PASSPORT:
      return action.password;
    default:
      return state;
  }
};
