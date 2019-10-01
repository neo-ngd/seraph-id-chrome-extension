import {
  ASK_CLAIM_ALIAS,
  CREATE_CLAIM_ALIAS,
  SET_PASSWORD,
  SET_WALLET,
  SET_CLAIM,
  TOGGLE_DIALOG,
  SEND_ERROR,
  DESTROY_ERROR,
  DESTROY_CLAIM,
  SET_PASSWORD_ALIAS,
  CHECK_PASSWORD_ALIAS, SET_HASH, DESTROY_HASH, GET_PASSWORD_ALIAS, SET_SESSION, DESTROY_SESSION
} from './actionTypes';

export const getEncryptedPassword = () =>
    ({ type: GET_PASSWORD_ALIAS });

export const checkPassword = password =>
    ({ type: CHECK_PASSWORD_ALIAS, password });

export const setEncryptedPassword = password =>
    ({type: SET_PASSWORD_ALIAS, password});

export const setPassword = password =>
  ({type: SET_PASSWORD, password});

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

export const setHash = hash =>
    ({ type: SET_HASH, hash});

export const destroyHash = () =>
    ({ type: DESTROY_HASH });

export const setSession = session =>
    ({ type: SET_SESSION, session});

export const destroySession = session =>
    ({ type: DESTROY_SESSION, session});


