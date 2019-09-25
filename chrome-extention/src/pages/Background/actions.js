import {
  ASK_CLAIM_ALIAS,
  CREATE_CLAIM_ALIAS,
  SET_PASSPORT,
  SET_WALLET,
  SET_CLAIM,
  TOGGLE_DIALOG,
} from './actionTypes';

export const setPassword = password =>
  ({type: SET_PASSPORT, password});

export const setExportedWallet = exportedWalletJSON =>
  ({type: SET_WALLET, exportedWalletJSON });

export const createClaim = (data, schemaName) =>
  ({type: CREATE_CLAIM_ALIAS, data, schemaName });

export const askClaim = claimID =>
  ({type: ASK_CLAIM_ALIAS, claimID});

export const setClaim = claim =>
  ({type: SET_CLAIM, claim});

export const toggleDialog = dialog =>
  ({ type: TOGGLE_DIALOG, dialog });
