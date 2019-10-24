// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import {
  ASK_CLAIM_ALIAS,
  CREATE_CLAIM_ALIAS,
  SET_PASSWORD_ALIAS,
  CHECK_PASSWORD_ALIAS,
  GET_PASSWORD_ALIAS,
  GET_PASSWORD_CS_ALIAS,
  SEND_ERROR_CS_ALIAS,
  SEND_ERROR_POPUP_ALIAS,
  IMPORT_WALLET_ALIAS,
  SHARE_ACTIVE_ACCOUNT,
} from './actionTypes';
import { createClaim, decrypt } from '../../commons/seraphSdkUtils';
import {
  setExportedWallet,
  setClaim,
  toggleDialog,
  setSession,
  getEncryptedPasswordToCS, setActiveAccount
} from './actions';
import { pwService } from "./pwService";
import {
  sendErrorToCS,
  invalidPwError,
  claimNotFoundError,
  unknownError,
  sendErrorToPopup,
  walletNotFoundError
} from "../../commons/errors";
import {
  ADD_CLAIM_ERROR_MSG,
  ADD_CLAIM_SUCCESS_MSG,
  DIALOG_TYPES,
  ENCRYPTED_PW_MSG,
  IMPORT_ERROR_MSG,
  IMPORT_SUCCESS_MSG,
  SHARE_ACCOUNT_MSG, SHARE_CLAIM_ERROR_MSG, SHARE_CLAIM_SUCCESS_MSG
} from "../../commons/constants";
import icon from '../../assets/icons/icon64.png';
import dictionary from "../../commons/dictionary";

/**
 * Send the status of adding the new claim to the wallet to the content script in the active browser tab.
 * @param success
 */
const addClaimResultEvent = success => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {msg: success ? ADD_CLAIM_SUCCESS_MSG : ADD_CLAIM_ERROR_MSG });
  });
};

/**
 * Send the status of asking about sharing the claim to the wallet to the content script in the active browser tab.
 * @param success
 */
const shareClaimResultEvent = success => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {msg: success ? SHARE_CLAIM_SUCCESS_MSG : SHARE_CLAIM_ERROR_MSG });
  });
};

/**
 * Send an error to the content script.
 * @param error
 * @return {function(): void}
 */
export const sendErrorToCSAlias = ({error}) =>
    () => sendErrorToCS(error);

/**
 * Send an error to the popup.
 * @param error
 * @return {function(): void}
 */
export const sendErrorToPopupAlias = ({error}) =>
    () => sendErrorToPopup(error);

/**
 * Set the password in the password service and set the session.
 * @param password
 * @return {function(*): *}
 */
export const setPasswordAlias = ({password}) => (dispatch) =>  {
  pwService.password = password;
  return dispatch(setSession(true));
};

/**
 * Valid the password and eventually decrypt the wallet.
 * @param password
 * @return {Function}
 */
export const checkPasswordAlias = ({password}) => async (dispatch, getState) => {
  try {
    const { wallet } = getState();
    const decrypted = await decrypt(wallet, password);
    if (!!decrypted) {
      pwService.password = password;
      dispatch(setActiveAccount(decrypted.accounts[0].label));
      dispatch(getEncryptedPasswordToCS());
      dispatch(shareActiveAccountAlias());
      return dispatch(setSession(true));
    }
    return sendErrorToPopup(invalidPwError());
  } catch (error) {
    sendErrorToCS(unknownError(error))
  }
};

/**
 * Share the password, wallet and active account with the popup and background script.
 * @return {Function}
 */
export const getEncryptedPasswordAlias = () => (dispatch, getState) => {
  const { wallet, activeAccount } = getState();
  chrome.runtime.sendMessage({msg: ENCRYPTED_PW_MSG, password: pwService.password, wallet, activeAccount});
};

/**
 * Share the password, wallet and active account with the content script.
 * @return {Function}
 */
export const getEncryptedPasswordCSAlias = () => (dispatch, getState) => {
  const { wallet, activeAccount } = getState();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {msg: ENCRYPTED_PW_MSG, password: pwService.password, wallet, activeAccount});
  });
};

/**
 * Share the active account with the content script.
 * @return {Function}
 */
export const shareActiveAccountAlias = () => (dispatch, getState) => {
  const { activeAccount } = getState();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {msg: SHARE_ACCOUNT_MSG, activeAccount });
  });
};

/**
 * Create and add the claim to the current account.
 * @param data
 * @param schemaName
 * @return {Function}
 */
export const createClaimAlias = ({data, schemaName}) => async (dispatch, getState) => {
  try {
    const { wallet } = getState();
    const decryptedWallet = await decrypt(wallet, pwService.password);
    if (!!decryptedWallet) {
      const claim = createClaim(schemaName, data, decryptedWallet);
      decryptedWallet.addClaim(claim);
      const encryption = decryptedWallet.accounts.map(acc => acc.encrypt(pwService.password));
      await Promise.all(encryption);
      const exportedWalletJSON = JSON.stringify(decryptedWallet.export());
      chrome.notifications.create({
        type: 'basic',
        iconUrl: icon,
        title: '',
        message: dictionary.events.saveClaimSuccess});
      addClaimResultEvent(true);
      return dispatch(setExportedWallet(exportedWalletJSON));
    }
    addClaimResultEvent(false);
    return sendErrorToCS(walletNotFoundError())
  } catch (error) {
    addClaimResultEvent(false);
    sendErrorToCS(unknownError(error))
  }
};

/**
 * Find and eventually share the asked claim with the content script.
 * @param schemaName
 * @param issuerDID
 * @param verifierName
 * @return {Function}
 */
export const askClaimAlias = ({schemaName, issuerDID, verifierName}) => async (dispatch, getState) => {
  try {
    const { wallet } = getState();
    const decryptedWallet = await decrypt(wallet, pwService.password);
    if (!!decryptedWallet) {
      const claims = decryptedWallet.getAllClaims(issuerDID);
      const claim = claims.find(claim => claim.schema === schemaName);
      if (!!claim) {
        dispatch(setClaim(claim));
        return dispatch(toggleDialog({open: true, context: DIALOG_TYPES.ASK_CLAIM, verifierName, schemaName}))
      }
      shareClaimResultEvent(false);
      return sendErrorToCS(claimNotFoundError())
    }
    shareClaimResultEvent(false);
    return sendErrorToCS(walletNotFoundError())
  } catch (error) {
    shareClaimResultEvent(false);
    sendErrorToCS(unknownError(error))
  }
};

/**
 * Import the wallet and replace the current one.
 * @param wallet
 * @return {Function}
 */
export const importWalletAlias = ({wallet}) => async (dispatch) => {
  try {
    dispatch(setExportedWallet(wallet));
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {msg: IMPORT_SUCCESS_MSG});
    });
    chrome.notifications.create({
      type: 'basic',
      iconUrl: icon,
      title: '',
      message: dictionary.events.importWalletSuccess});
  } catch (error) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {msg: IMPORT_ERROR_MSG});
    });
  }
};

export default {
  [CREATE_CLAIM_ALIAS]: action => createClaimAlias(action),
  [ASK_CLAIM_ALIAS]: action => askClaimAlias(action),
  [SET_PASSWORD_ALIAS]: action => setPasswordAlias(action),
  [CHECK_PASSWORD_ALIAS]: action => checkPasswordAlias(action),
  [GET_PASSWORD_ALIAS]: () => getEncryptedPasswordAlias(),
  [GET_PASSWORD_CS_ALIAS]: () => getEncryptedPasswordCSAlias(),
  [SEND_ERROR_POPUP_ALIAS]: action => sendErrorToPopupAlias(action),
  [SEND_ERROR_CS_ALIAS]: action => sendErrorToCSAlias(action),
  [IMPORT_WALLET_ALIAS]: action => importWalletAlias(action),
  [SHARE_ACTIVE_ACCOUNT]: () => shareActiveAccountAlias(),
}
