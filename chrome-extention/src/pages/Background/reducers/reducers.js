import {
  DESTROY_CLAIM,
  SET_CLAIM,
  SET_PASSPORT,
  SET_WALLET,
  TOGGLE_DIALOG } from '../actionTypes';

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

export const claim = (state = null, action) => {
  switch (action.type) {
    case SET_CLAIM:
      return action.claim;
    case DESTROY_CLAIM:
      return null;
    default:
      return state;
  }
};

const initDialogState = {
  open: false,
  context: null
};
export const dialog = (state = initDialogState, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return action.dialog;
    default:
      return state;
  }
}
