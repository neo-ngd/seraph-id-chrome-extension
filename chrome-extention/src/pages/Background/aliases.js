import {
  ASK_CLAIM_ALIAS,
  CREATE_CLAIM_ALIAS,
  SET_PASSWORD_ALIAS,
  CHECK_PASSWORD_ALIAS,
  GET_PASSWORD_ALIAS,
  GET_PASSWORD_CS_ALIAS,
  SEND_ERROR_CS_ALIAS,
  SEND_ERROR_POPUP_ALIAS,
  IMPORT_WALLET_ALIAS
} from './actionTypes';
import { createClaim, decrypt } from '../../commons/seraphSdkUtils';
import {
  setExportedWallet,
  setClaim,
  toggleDialog,
  setSession,
  getEncryptedPasswordToCS
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
import {DIALOG_TYPES, ENCRYPTED_PW_MSG, IMPORT_ERROR_MSG, IMPORT_SUCCESS_MSG} from "../../commons/constants";
import icon from '../../assets/icons/icon64.png';

const sendErrorToCSAlias = ({error}) =>
    () => sendErrorToCS(error);

const sendErrorToPopupAlias = ({error}) =>
    () => sendErrorToPopup(error);

const setPasswordAlias = ({password}) => (dispatch) =>  {
  pwService.password = password;
  return dispatch(setSession(true));
};

const checkPasswordAlias = ({password}) => async (dispatch, getState) => {
  try {
    const { wallet } = getState();
    const decrypted = await decrypt(wallet, password);
    if (!!decrypted) {
      pwService.password = password;
      dispatch(getEncryptedPasswordToCS());
      return dispatch(setSession(true));
    }
    return sendErrorToPopup(invalidPwError());
  } catch (error) {
    sendErrorToCS(unknownError(error))
  }
};

const getEncryptedPasswordAlias = () => (dispatch, getState) => {
  const { wallet } = getState();
  chrome.runtime.sendMessage({msg: ENCRYPTED_PW_MSG, password: pwService.password, wallet});
};

const getEncryptedPasswordCSAlias = () => (dispatch, getState) => {
  const { wallet } = getState();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {msg: ENCRYPTED_PW_MSG, password: pwService.password, wallet});
  });
};

const createClaimAlias = ({data, schemaName}) => async (dispatch, getState) => {
  try {
    const { wallet } = getState();
    const decryptedWallet = await decrypt(wallet, pwService.password);
    if (!!decryptedWallet) {
      const claim = createClaim(schemaName, data, decryptedWallet);
      decryptedWallet.addClaim(claim);
      await decryptedWallet.accounts[0].encrypt(pwService.password);
      const exportedWalletJSON = JSON.stringify(decryptedWallet.export());
      chrome.notifications.create({
        type: 'basic',
        iconUrl: icon,
        title: '',
        message: 'The claim has been saved'});
      return dispatch(setExportedWallet(exportedWalletJSON));
    }
    return sendErrorToCS(walletNotFoundError())
  } catch (error) {
    sendErrorToCS(unknownError(error))
  }
};

const askClaimAlias = ({schemaName, issuerDID, verifierName}) => async (dispatch, getState) => {
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
      return sendErrorToCS(claimNotFoundError())
    }
    return sendErrorToCS(walletNotFoundError())
  } catch (error) {
    sendErrorToCS(unknownError(error))
  }
};

const importWalletAlias = ({wallet}) => async (dispatch) => {
  try {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: icon,
      title: '',
      message: 'Your wallet has been imported'});
      dispatch(setExportedWallet(wallet));
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {msg: IMPORT_SUCCESS_MSG});
    });
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
}
