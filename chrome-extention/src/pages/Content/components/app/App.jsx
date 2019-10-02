import React, { useState, useEffect } from 'react';
import DialogClaim from '../../../../components/Dialogs/Dialogs';
import { useSelector, useDispatch } from 'react-redux';
import { decrypt } from '../../../../commons/seraphSdkUtils';
import {
  askClaim,
  createClaim,
  destroyClaim,
  getEncryptedPasswordToCS,
  sendErrorToCSAlias,
  setClaim,
  toggleDialog
} from '../../../Background/actions';
import {claimDeclineError, ERROR_MSG, walletNotFoundError} from "../../../../commons/errors";
import {DIALOG_TYPES, ENCRYPTED_PW_MSG, EVENT_NAMES} from "../../../../commons/constants";

function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { dialog, claim, wallet: accountFromStore } = useSelector(state => state);

  useEffect(() => {
    injectScript();
    chrome.runtime.onMessage.addListener(onMessageListener);
    dispatch(getEncryptedPasswordToCS());
    return unregisterListeners;
  }, []);

  const onMessageListener = request => {
    if (request.msg === ENCRYPTED_PW_MSG) {
      decryptSetWallet(request.password);
    }
    if (request.msg === ERROR_MSG) {
      dispatchClaimErrorEvent(request.error);
    }
  };

  const decryptSetWallet = async (password) => {
    const wallet = await decrypt(accountFromStore, password);
    unregisterListeners();
    registerListeners(wallet);
  };

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
    handleClickOpen(DIALOG_TYPES.GET_CLAIM);
  };

  const getAddressListener = (wallet) =>
    !!wallet ?
        document.dispatchEvent(new CustomEvent('getAddress', {detail: wallet.accounts[0].label})) :
        dispatch(sendErrorToCSAlias(walletNotFoundError()));

  const askClaimListener = ({detail}) => dispatch(askClaim(detail));

  const registerListeners = (wallet) => {
    document.addEventListener('sendClaim', getClaimListener);
    document.addEventListener('sendAddress', () => getAddressListener(wallet)); // TODO UNREGISTER NOT WORKING
    document.addEventListener('askClaim', askClaimListener);
    // TODO REMOVE
    document.addEventListener(EVENT_NAMES.CLAIM_SUCCESS, dummyListener);
    document.addEventListener(EVENT_NAMES.CLAIM_ERROR, dummyListener);
  };

  const unregisterListeners = () => {
    document.removeEventListener('sendClaim', getClaimListener);
    document.removeEventListener('sendAddress', getAddressListener);
    document.removeEventListener('askClaim', askClaimListener);
    // TODO REMOVE
    document.removeEventListener(EVENT_NAMES.CLAIM_SUCCESS, dummyListener);
    document.removeEventListener(EVENT_NAMES.CLAIM_ERROR, dummyListener);
  };

  const dummyListener = e => console.warn(e);

  const handleClickOpen = context => {
    dispatch(toggleDialog({context}));
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(toggleDialog({context: null}));
    setOpen(false);
  };

  const handleDecline = () => {
    dispatch(sendErrorToCSAlias(claimDeclineError()));
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
      sendClaim: claim => {
        document.dispatchEvent(
            new CustomEvent('sendClaim', { detail: claim })
        )
      },

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
      document.dispatchEvent(new CustomEvent(EVENT_NAMES.CLAIM_ERROR, { detail: error}));

  /**
   * Dispatch claimSuccess event.
   * @param claim
   * @return {boolean}
   */
  const dispatchClaimSuccessEvent = claim =>
      document.dispatchEvent(new CustomEvent(EVENT_NAMES.CLAIM_SUCCESS, { detail: claim}));

  return (
    <DialogClaim
      handleClose={dialog.context === DIALOG_TYPES.ASK_CLAIM ? handleDecline : handleClose}
      claim={claim}
      handleClaim={dialog.context === DIALOG_TYPES.ASK_CLAIM ? shareClaim : addClaim}
      open={open}
      {...dialog}
      />
  );
}

export default App;
