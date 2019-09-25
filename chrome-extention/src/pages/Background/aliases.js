import { ASK_CLAIM_ALIAS, CREATE_CLAIM_ALIAS } from './actionTypes';
import { createClaim, decrypt } from '../../commons/seraphSdkUtils';
import { setExportedWallet, setClaim, toggleDialog } from './actions';
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
      iconUrl: 'https://picsum.photos/50',
      title: '',
      message: 'The claim has been saved'});
    return dispatch(setExportedWallet(exportedWalletJSON));
  } catch (e) {
    // TODO error handler
    console.warn(e)
  }
};

const askClaimAlias = ({claimID}) => async (dispatch, getState) => {
  try {
    const { wallet, password } = getState();
    const decryptedWallet = await decrypt(wallet, password);
    const claim = decryptedWallet.getClaim(claimID);
    if (!!claim) {
      dispatch(setClaim(claim));
      return dispatch(toggleDialog({open: true, context: dialogTypes.ASK_CLAIM}))
    }
    // TODO dispatch error
  } catch (e) {
    // TODO error handler
    console.warn(e)
  }
};

export default {
  [CREATE_CLAIM_ALIAS]: action => createClaimAlias(action),
  [ASK_CLAIM_ALIAS]: action => askClaimAlias(action)
}
