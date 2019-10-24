// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

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

/**
 * Send encrypted password
 * @return {{type: *}}
 */
export const getEncryptedPassword = () =>
    ({ type: GET_PASSWORD_ALIAS });

/**
 * Send encrypted password to content script
 * @return {{type: *}}
 */
export const getEncryptedPasswordToCS = () =>
    ({ type: GET_PASSWORD_CS_ALIAS });

/**
 * Validate passed password
 * @param password
 * @return {{password: *, type: *}}
 */
export const checkPassword = password =>
    ({ type: CHECK_PASSWORD_ALIAS, password });

/**
 * Set the new password
 * @param password
 * @return {{password: *, type: *}}
 */
export const setPassword = password =>
  ({type: SET_PASSWORD_ALIAS, password});

/**
 * Set the exported wallet in JSON
 * @param exportedWalletJSON
 * @return {{exportedWalletJSON: *, type: *}}
 */
export const setExportedWallet = exportedWalletJSON =>
  ({type: SET_WALLET, exportedWalletJSON });

/**
 * Add new claim to the wallet.
 * @param data
 * @param schemaName
 * @return {{data: *, type: *, schemaName: *}}
 */
export const createClaim = (data, schemaName) =>
  ({type: CREATE_CLAIM_ALIAS, data, schemaName });

/**
 * Ask about sharing the claim with the verifier page.
 * @param schemaName
 * @param issuerDID
 * @param verifierName
 * @return {{issuerDID: *, type: *, schemaName: *, verifierName: *}}
 */
export const askClaim = ({schemaName, issuerDID, verifierName}) =>
  ({type: ASK_CLAIM_ALIAS, schemaName, issuerDID, verifierName});

/**
 * Set the claim in the redux store.
 * @param claim
 * @return {{claim: *, type: *}}
 */
export const setClaim = claim =>
  ({type: SET_CLAIM, claim});

/**
 * Remove the claim from the redux store.
 * @return {{type: *}}
 */
export const destroyClaim = () =>
    ({ type: DESTROY_CLAIM });

/**
 * Toggle the content script modal dialog.
 * @param {{context: string, verifierName: string, schemaName: string}} dialog - context may be "GET_CLAIM" or "ASK_CLAIM"
 * @return {{dialog: {context: string, verifierName: string, schemaName: string}, type: *}}
 */
export const toggleDialog = dialog =>
  ({ type: TOGGLE_DIALOG, dialog });

/**
 * Set the session
 * @param {boolean} session
 * @return {{session: {boolean}, type: *}}
 */
export const setSession = session =>
    ({ type: SET_SESSION, session});

/**
 * Set the session on false.
 * @param session
 * @return {{session: *, type: *}}
 */
export const destroySession = session =>
    ({ type: DESTROY_SESSION, session});

/**
 * Send an error to the popup.
 * @param error
 * @return {{type: *, error: *}}
 */
export const sendErrorToPopupAlias = error =>
    ({ type: SEND_ERROR_POPUP_ALIAS, error });

/**
 * Share the active account label with the issuer or verifier page.
 * @return {{type: *}}
 */
export const shareActiveAccountAlias = () =>
    ({ type: SHARE_ACTIVE_ACCOUNT });

/**
 * Send an error to the content script.
 * @param error
 * @return {{type: *, error: *}}
 */
export const sendErrorToCSAlias = error =>
    ({ type: SEND_ERROR_CS_ALIAS, error });

/**
 * Import the wallet.
 * @param wallet
 * @return {{wallet: *, type: *}}
 */
export const importWalletAlias = wallet =>
    ({ type: IMPORT_WALLET_ALIAS, wallet });

/**
 * Set the active account.
 * @param {string} account
 * @return {{type: *, account: {string}}}
 */
export const setActiveAccount = account =>
    ({ type: SET_ACTIVE_ACCOUNT, account });
