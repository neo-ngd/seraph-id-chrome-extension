import { ASK_CLAIM_ALIAS, CREATE_CLAIM_ALIAS } from './actionTypes';
import { createClaim, decrypt } from '../../commons/seraphSdkUtils';
import {setExportedWallet, setClaim, toggleDialog, sendError} from './actions';
import { dialogTypes } from '../Content/contentTypes';

const createClaimAlias = ({data, schemaName}) => async (dispatch, getState) => {
  try {
    const { wallet, password } = getState();
    const decryptedWallet = await decrypt(wallet, password);
    const claim = createClaim(schemaName, data, decryptedWallet);
    decryptedWallet.addClaim(claim);
    await decryptedWallet.accounts[0].encrypt(password);
    const exportedWalletJSON = JSON.stringify(decryptedWallet.export());
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'https://picsum.photos/50', // TODO add brand image
      title: '',
      message: 'The claim has been saved'});
    return dispatch(setExportedWallet(exportedWalletJSON));
  } catch (error) {
    dispatch(sendError({
      code: 'err:unknown',
      message: 'unknown error',
      error
    }))
  }
};

const askClaimAlias = ({schemaName, issuerDID, verifierName}) => async (dispatch, getState) => {
  try {
    const { wallet, password } = getState();
    const decryptedWallet = await decrypt(wallet, password);
    const claims = decryptedWallet.getAllClaims(issuerDID);
    const claim = claims.find(claim => claim.schema === schemaName);
    if (!!claim) {
      dispatch(setClaim(claim));
      return dispatch(toggleDialog({open: true, context: dialogTypes.ASK_CLAIM, verifierName, schemaName}))
    }
    return dispatch(sendError({
      code: 'err:notFound',
      message: "credential doesn't exists",
      error: new Error("credential doesn't exists")
    }))
  } catch (error) {
    dispatch(sendError({
      code: 'err:unknown',
      message: 'unknown error',
      error
    }))
  }
};

export default {
  [CREATE_CLAIM_ALIAS]: action => createClaimAlias(action),
  [ASK_CLAIM_ALIAS]: action => askClaimAlias(action)
}
