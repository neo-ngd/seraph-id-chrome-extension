import {
  DESTROY_CLAIM,
  SEND_ERROR,
  DESTROY_ERROR,
  SET_CLAIM,
  SET_WALLET,
  TOGGLE_DIALOG,
  SET_HASH,
  DESTROY_HASH, SET_SESSION, DESTROY_SESSION
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

const initErrorState = {
  code: null,
  message: null,
  error: null,
};
export const error = (state = initErrorState, action) => {
  switch (action.type) {
    case SEND_ERROR:
      return action.error;
    case DESTROY_ERROR:
      return initErrorState;
    default:
      return state;
  }
};

export const hash = (state = null, action) => {
  switch (action.type) {
    case SET_HASH:
      return action.hash;
    case DESTROY_HASH:
      return null;
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
