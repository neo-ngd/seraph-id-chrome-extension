import {ASK_CLAIM_ALIAS, CREATE_CLAIM_ALIAS, SET_PASSWORD_ALIAS, CHECK_PASSWORD_ALIAS, GET_PASSWORD_ALIAS} from './actionTypes';
import { createClaim, decrypt } from '../../commons/seraphSdkUtils';
import {setExportedWallet, setClaim, toggleDialog, sendError, setHash, setSession} from './actions';
import { dialogTypes } from '../Content/contentTypes';
import {NOT_FOUND, UNKNOWN, INVALID_PW} from "../../commons/errorCodes";
import {encryptPassword, validPassword} from "../../commons/walletUtils";
import { pwService } from "./pwService";

/**
 * Unknown error action creator
 * @param error
 * @return {{type: *, error: *}}
 */
const sendUnknownError = error => sendError({
  code: UNKNOWN,
  message: 'unknown error',
  error
});

const setPasswordAlias = ({password}) => async (dispatch, getState) => {
  try {
    const hash = await encryptPassword(password);
    pwService.password = password;
    dispatch(setSession(true));
    return dispatch(setHash(hash));
  } catch (error) {
    dispatch(sendUnknownError(error))
  }
};

const checkPasswordAlias = ({password}) => async (dispatch, getState) => {
  try {
    const { hash } = getState();
    const isValid = await validPassword(password, hash);
    if (isValid) {
      pwService.password = password;
      return dispatch(setSession(true));
    }
    return dispatch(sendError({
      code: INVALID_PW,
      message: "Invalid password",
      error: new Error("Invalid password")
    }))
  } catch (error) {
    dispatch(sendUnknownError(error))
  }
};

const getEncryptedPasswordAlias = () => chrome.runtime.sendMessage({msg: 'encryptedPw', password: pwService.password});

const createClaimAlias = ({data, schemaName}) => async (dispatch, getState) => {
  try {
    const { wallet } = getState();
    const decryptedWallet = await decrypt(wallet, pwService.password);
    const claim = createClaim(schemaName, data, decryptedWallet);
    decryptedWallet.addClaim(claim);
    await decryptedWallet.accounts[0].encrypt(pwService.password);
    const exportedWalletJSON = JSON.stringify(decryptedWallet.export());
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'https://picsum.photos/50', // TODO add brand image
      title: '',
      message: 'The claim has been saved'});
    return dispatch(setExportedWallet(exportedWalletJSON));
  } catch (error) {
    dispatch(sendUnknownError(error))
  }
};

const askClaimAlias = ({schemaName, issuerDID, verifierName}) => async (dispatch, getState) => {
  try {
    const { wallet } = getState();
    const decryptedWallet = await decrypt(wallet, pwService.password);
    const claims = decryptedWallet.getAllClaims(issuerDID);
    const claim = claims.find(claim => claim.schema === schemaName);
    if (!!claim) {
      dispatch(setClaim(claim));
      return dispatch(toggleDialog({open: true, context: dialogTypes.ASK_CLAIM, verifierName, schemaName}))
    }
    return dispatch(sendError({
      code: NOT_FOUND,
      message: "credential doesn't exists",
      error: new Error("credential doesn't exists")
    }))
  } catch (error) {
    dispatch(sendUnknownError(error))
  }
};

export default {
  [CREATE_CLAIM_ALIAS]: action => createClaimAlias(action),
  [ASK_CLAIM_ALIAS]: action => askClaimAlias(action),
  [SET_PASSWORD_ALIAS]: action => setPasswordAlias(action),
  [CHECK_PASSWORD_ALIAS]: action => checkPasswordAlias(action),
  [GET_PASSWORD_ALIAS]: () => getEncryptedPasswordAlias()
}
