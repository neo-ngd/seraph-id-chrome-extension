import {
  DESTROY_CLAIM,
  SET_CLAIM,
  SET_WALLET,
  TOGGLE_DIALOG,
  SET_SESSION,
  DESTROY_SESSION
} from '../actionTypes';

export const wallet = (state = null, action) => {
  switch (action.type) {
    case SET_WALLET:
      return action.wallet ? action.wallet : action.exportedWalletJSON;
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
  context: null,
  verifierName: null,
  schemaName: null,
};
export const dialog = (state = initDialogState, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return action.dialog;
    default:
      return state;
  }
};

export const session = (state = false, action) => {
  switch (action.type) {
    case SET_SESSION:
      return action.session;
    case DESTROY_SESSION:
      return false;
    default:
      return state;
  }
};
