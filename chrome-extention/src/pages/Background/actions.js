import { CREATE_CLAIM_ALIAS, SET_PASSPORT, SET_WALLET } from './actionTypes';

export const setPassword = password =>
  ({type: SET_PASSPORT, password});

export const setExportedWallet = exportedWalletJSON =>
  ({type: SET_WALLET, exportedWalletJSON });

export const createClaim = (data, schemaName) =>
  ({type: CREATE_CLAIM_ALIAS, data, schemaName });
