import React, { useState, useEffect } from 'react';
import DialogClaim from '../../../../components/Dialogs/Dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { decrypt } from '../../../../commons/seraphSdkUtils';
import {
  askClaim,
  createClaim,
  destroyClaim,
  destroyError,
  sendError,
  setClaim,
  toggleDialog
} from '../../../Background/actions';
import {dialogTypes, eventNames} from '../../contentTypes';

function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { dialog, password, claim, error, wallet: accountFromStore } = useSelector(state => state);

  useEffect(() => {
    injectScript();
    const decryptSetWallet = async () => {
      const wallet = await decrypt(accountFromStore, password);
      registerListeners(wallet);
    };
    decryptSetWallet();
    return unregisterListeners;
  }, []);

  const injectScript = () => {
    const script = document.createElement('script'),
      code = document.createTextNode('(' + seraphIdInjected + ')();');
    script.appendChild(code);
    (document.body || document.head || document.documentElement).appendChild(
      script
    );
  };

  const getClaimListener = ({detail: claim}) => {
    dispatch(setClaim(claim));
    handleClickOpen(dialogTypes.GET_CLAIM);
  };

  const getAddressListener = wallet =>
      !!wallet ?
          document.dispatchEvent(new CustomEvent('getAddress', {detail: wallet.accounts[0].label})) :
          dispatch(sendError({code: 'err:noWallet', message: 'cannot find any wallet', error: new Error('cannot find any wallet')}));

  const askClaimListener = ({detail}) => dispatch(askClaim(detail));

  const registerListeners = (wallet) => {
    document.addEventListener('sendClaim', getClaimListener);
    document.addEventListener('sendAddress', () => getAddressListener(wallet));
    document.addEventListener('askClaim', askClaimListener);
    // TEST PURPOSE
    document.addEventListener(eventNames.CLAIM_SUCCESS, e => console.warn(e));
    document.addEventListener(eventNames.CLAIM_ERROR, e => console.warn(e));
  };

  const unregisterListeners = () => {
    document.removeEventListener('sendClaim', getClaimListener);
    document.removeEventListener('sendAddress', getAddressListener);
    document.removeEventListener('askClaim', askClaimListener);
  };

  const handleClickOpen = context => {
    dispatch(toggleDialog({context}))
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(toggleDialog({context: null}));
    setOpen(false);
  };

  const handleDecline = () => {
    dispatch(sendError({
      code: 'err:decline',
      message: 'user didn\'t accept to share the credential',
      error: new Error('user didn\'t accept to share the credential')
    }));
    dispatch(toggleDialog({context: null}));
    setOpen(false);
  };

  const addClaim = () => {
    dispatch(createClaim(claim, claim.schema));
    handleClose();
  };

  const shareClaim = () =>{
    dispatchClaimSuccessEvent(claim);
    dispatch(destroyClaim());
    handleClose()
  };

  const seraphIdInjected = () => {
    window.seraphID = {
      /**
       * Send the claim to content script
       * @param {object} claim
       */
      sendClaim: claim => document.dispatchEvent(
          new CustomEvent('sendClaim', { detail: claim })
      ),

      /**
       * Ask for the claim
       * @param {string} schemaName
       * @param {string} issuerDID
       * @param {string} verifierName
       */
      askClaim: (schemaName, issuerDID, verifierName) =>
          document.dispatchEvent(
              new CustomEvent('askClaim', { detail: {schemaName, issuerDID, verifierName} })),

      /**
       * Return wallet address
       * @return {Promise<string>}
       */
      getAddress: () => new Promise((resolve, reject) => {
        try {
          const getResponse = response => {
            document.removeEventListener('getAddress', getResponse);
            resolve (response.detail);
          };
          document.addEventListener('getAddress', getResponse);
          document.dispatchEvent(new CustomEvent('sendAddress'));
        } catch (e) {
          reject(e)
        }
      })
    };
  };

  /**
   * Dispatch the claimError event.
   * @param {{error: Error, code: string, message: string}} error
   * @return {boolean}
   */
  const dispatchClaimErrorEvent = error =>
      document.dispatchEvent(new CustomEvent(eventNames.CLAIM_ERROR, { detail: error}));

  /**
   * Dispatch claimSuccess event.
   * @param claim
   * @return {boolean}
   */
  const dispatchClaimSuccessEvent = claim =>
      document.dispatchEvent(new CustomEvent(eventNames.CLAIM_SUCCESS, { detail: claim}));

  if (!!error.error) {
    dispatchClaimErrorEvent(error);
    dispatch(destroyError())
  }

  return (
    <DialogClaim
      handleClose={dialog.context === dialogTypes.ASK_CLAIM ? handleDecline : handleClose}
      claim={claim}
      handleClaim={dialog.context === dialogTypes.ASK_CLAIM ? shareClaim : addClaim}
      open={open}
      {...dialog}
      />
  );
}

export default App;
