import {
  ASK_CLAIM_ALIAS,
  CREATE_CLAIM_ALIAS,
  SET_PASSPORT,
  SET_WALLET,
  SET_CLAIM,
  TOGGLE_DIALOG,
  SEND_ERROR, DESTROY_ERROR, DESTROY_CLAIM
} from './actionTypes';

export const setPassword = password =>
  ({type: SET_PASSPORT, password});

export const setExportedWallet = exportedWalletJSON =>
  ({type: SET_WALLET, exportedWalletJSON });

export const createClaim = (data, schemaName) =>
  ({type: CREATE_CLAIM_ALIAS, data, schemaName });

export const askClaim = ({schemaName, issuerDID, verifierName}) =>
  ({type: ASK_CLAIM_ALIAS, schemaName, issuerDID, verifierName});

export const setClaim = claim =>
  ({type: SET_CLAIM, claim});

export const destroyClaim = () =>
    ({ type: DESTROY_CLAIM });

export const toggleDialog = dialog =>
  ({ type: TOGGLE_DIALOG, dialog });

export const sendError = error =>
    ({ type: SEND_ERROR, error});

export const destroyError = () =>
    ({ type: DESTROY_ERROR });

