import {
  ASK_CLAIM_ALIAS,
  CREATE_CLAIM_ALIAS,
  SET_WALLET,
  SET_CLAIM,
  TOGGLE_DIALOG,
  DESTROY_CLAIM,
  SET_PASSWORD_ALIAS,
  CHECK_PASSWORD_ALIAS,
  GET_PASSWORD_ALIAS,
  SET_SESSION,
  DESTROY_SESSION,
  GET_PASSWORD_CS_ALIAS,
  SEND_ERROR_POPUP_ALIAS,
  SEND_ERROR_CS_ALIAS,
  IMPORT_WALLET_ALIAS,
  SET_ACTIVE_ACCOUNT, SHARE_ACTIVE_ACCOUNT
} from './actionTypes';

export const getEncryptedPassword = () =>
    ({ type: GET_PASSWORD_ALIAS });

export const getEncryptedPasswordToCS = () =>
    ({ type: GET_PASSWORD_CS_ALIAS });

export const checkPassword = password =>
    ({ type: CHECK_PASSWORD_ALIAS, password });

export const setPassword = password =>
  ({type: SET_PASSWORD_ALIAS, password});

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

export const setSession = session =>
    ({ type: SET_SESSION, session});

export const destroySession = session =>
    ({ type: DESTROY_SESSION, session});

export const sendErrorToPopupAlias = error =>
    ({ type: SEND_ERROR_POPUP_ALIAS, error });

export const shareActiveAccountAlias = () =>
    ({ type: SHARE_ACTIVE_ACCOUNT });

export const sendErrorToCSAlias = error =>
    ({ type: SEND_ERROR_CS_ALIAS, error });

export const importWalletAlias = wallet =>
    ({ type: IMPORT_WALLET_ALIAS, wallet });

export const setActiveAccount = account =>
    ({ type: SET_ACTIVE_ACCOUNT, account });
