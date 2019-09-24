import { CREATE_CLAIM_ALIAS } from './actionTypes';
import { createClaim, decrypt } from '../../commons/seraphSdkUtils';
import { setExportedWallet } from './actions';

const createClaimAlias = ({data, schemaName}) => async (dispatch, getState) => {
  try {
    const { wallet, password } = getState();
    const decryptedWallet = await decrypt(wallet, password);
    const claim = createClaim(schemaName, data, decryptedWallet);
    decryptedWallet.addClaim(claim);
    await decryptedWallet.accounts[0].encrypt(password);
    const exportedWalletJSON = JSON.stringify(decryptedWallet.export());
    return dispatch(setExportedWallet(exportedWalletJSON));
  } catch (e) {
    // TODO error handler
    console.warn(e)
  }
};

export default {
  [CREATE_CLAIM_ALIAS]: action => createClaimAlias(action)
}
