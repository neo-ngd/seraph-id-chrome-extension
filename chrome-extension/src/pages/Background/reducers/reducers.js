// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import {
  DESTROY_CLAIM,
  SET_CLAIM,
  SET_WALLET,
  TOGGLE_DIALOG,
  SET_SESSION,
  DESTROY_SESSION, SET_ACTIVE_ACCOUNT
} from '../actionTypes';

/**
 * Set the wallet or exported wallet in JSON.
 * @param state
 * @param action
 * @return {*|{test}|string}
 */
export const wallet = (state = null, action) => {
  switch (action.type) {
    case SET_WALLET:
      return action.wallet ? action.wallet : action.exportedWalletJSON;
    default:
      return state;
  }
};

/**
 * Set or destroy the claim
 * @param state
 * @param action
 * @return {Fixed8 | number | string | {test} | props.claim | {test} | * | (() => Promise<void>)|null}
 */
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
/**
 * Set the dialog state.
 * @param {{context: string, verifierName: string, schemaName: string}} state - context may be "GET_CLAIM" or "ASK_CLAIM"
 * @param action
 * @return {{context: null, verifierName: null, schemaName: null}|*}
 */
export const dialog = (state = initDialogState, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return action.dialog;
    default:
      return state;
  }
};

/**
 * Set or destroy the session
 * @param {boolean} state
 * @param action
 * @return {Boolean|boolean}
 */
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

/**
 * Set the active account label
 * @param state
 * @param action
 * @return {*}
 */
export const activeAccount = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_ACCOUNT:
      return action.account;
    default:
      return state;
  }
};
