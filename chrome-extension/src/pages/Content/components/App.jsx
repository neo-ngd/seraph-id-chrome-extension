// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useState, useEffect } from 'react';
import Dialog from '../../../components/Dialogs/Dialogs';
import { useSelector, useDispatch } from 'react-redux';
import {
  askClaim,
  createClaim,
  destroyClaim,
  sendErrorToCSAlias,
  setClaim,
  shareActiveAccountAlias,
  toggleDialog,
} from '../../Background/actions';
import { claimDeclineError, ERROR_MSG } from '../../../commons/errors';
import {
  DIALOG_TYPES,
  EVENT_NAMES,
  SHARE_ACCOUNT_MSG,
  ADD_CLAIM_SUCCESS_MSG,
  ADD_CLAIM_ERROR_MSG,
  SHARE_CLAIM_SUCCESS_MSG,
  SHARE_CLAIM_ERROR_MSG,
} from '../../../commons/constants';

/**
 * <App />
 * Mount the dialog modal inside the targeted page.
 * @return {*}
 * @constructor
 */
const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isListener, setIsListener] = useState(false);
  const { dialog, claim } = useSelector((state) => state);

  useEffect(() => {
    injectScript();

    if (!isListener) {
      registerListeners();
    }
    chrome.runtime.onMessage.addListener(onMessageListener);
    dispatch(shareActiveAccountAlias());
    return () => {
      chrome.runtime.onMessage.removeListener(onMessageListener);
      unregisterListeners();
    };
  }, []);

  /**
   * Based on provided request it call the proper methods.
   * @param request
   */
  const onMessageListener = (request) => {
    if (request.msg === SHARE_CLAIM_SUCCESS_MSG) {
      dispatchShareClaimSuccessEvent();
    }
    if (request.msg === SHARE_CLAIM_ERROR_MSG) {
      dispatchShareClaimErrorEvent();
    }
    if (request.msg === ADD_CLAIM_SUCCESS_MSG) {
      dispatchAddClaimSuccessEvent();
    }
    if (request.msg === ADD_CLAIM_ERROR_MSG) {
      dispatchAddClaimErrorEvent();
    }
    if (request.msg === SHARE_ACCOUNT_MSG) {
      dispatchShareAccountEvent(request.activeAccount);
    }
    if (request.msg === ERROR_MSG) {
      dispatchClaimErrorEvent(request.error);
    }
  };

  /**
   * Inject the script inside the targeted page.
   */
  const injectScript = () => {
    const script = document.createElement('script');
    const code = document.createTextNode('(' + seraphIdInjected + ')();');
    script.appendChild(code);
    (document.body || document.head || document.documentElement).appendChild(
      script
    );
  };

  /**
   * set passed claim in the redux store.
   * @param claim
   */
  const getClaimListener = ({ detail: claim }) => {
    dispatch(setClaim(claim));
    handleClickOpen(DIALOG_TYPES.GET_CLAIM);
  };

  /**
   * Trigger the sharing of active account event.
   */
  const getAddressListener = () => dispatch(shareActiveAccountAlias());

  /**
   * Trigger the asking about the claim event.
   * @param detail
   */
  const askClaimListener = ({ detail }) => dispatch(askClaim(detail));

  /**
   * Register the listeners.
   */
  const registerListeners = () => {
    document.addEventListener(EVENT_NAMES.SEND_CLAIM, getClaimListener);
    document.addEventListener(EVENT_NAMES.GET_ADDRESS, getAddressListener);
    document.addEventListener(EVENT_NAMES.ASK_CLAIM, askClaimListener);
    setIsListener(true);
  };

  /**
   * Unregister the listeners.
   */
  const unregisterListeners = () => {
    document.removeEventListener(EVENT_NAMES.SEND_CLAIM, getClaimListener);
    document.removeEventListener(EVENT_NAMES.GET_ADDRESS, getAddressListener);
    document.removeEventListener(EVENT_NAMES.ASK_CLAIM, askClaimListener);
    setIsListener(false);
  };

  /**
   * Open the modal dialog with the proper context.
   * @param context
   */
  const handleClickOpen = (context) => {
    dispatch(toggleDialog({ context }));
    setOpen(true);
  };

  /**
   * Close the modal dialog.
   */
  const handleClose = () => {
    dispatchAddClaimErrorEvent();
    dispatch(toggleDialog({ context: null }));
    setOpen(false);
  };

  /**
   * Handle the decline action.
   */
  const handleDecline = () => {
    dispatch(sendErrorToCSAlias(claimDeclineError()));
    dispatch(toggleDialog({ context: null }));
    dispatchShareClaimErrorEvent();
    setOpen(false);
  };

  /**
   * Add the claim to the wallet.
   */
  const addClaim = () => {
    dispatch(createClaim(claim, claim.schema));
    dispatch(toggleDialog({ context: null }));
    setOpen(false);
  };

  /**
   * Share the asked claim with the page.
   */
  const shareClaim = () => {
    dispatchShareClaimSuccessEvent(claim);
    dispatch(destroyClaim());
    handleClose();
  };

  /**
   * The script to inject on the issuer or verifier page.
   * It adds the seraphID object to the window global object.
   */
  const seraphIdInjected = () => {
    window.seraphID = {
      /**
       * Send the claim to content script
       * @param {object} claim
       */
      sendClaim: (claim) =>
        document.dispatchEvent(new CustomEvent('sendClaim', { detail: claim })),

      /**
       * Ask for the claim
       * @param {string} schemaName
       * @param {string} issuerDID
       * @param {string} verifierName
       */
      askClaim: (schemaName, issuerDID, verifierName) =>
        document.dispatchEvent(
          new CustomEvent('askClaim', {
            detail: { schemaName, issuerDID, verifierName },
          })
        ),

      /**
       * Ask for the current account address
       */
      shareAddress: () => document.dispatchEvent(new CustomEvent('getAddress')),
    };
  };

  /**
   * Dispatch the claimError event.
   * @param {{error: Error, code: string, message: string}} error
   * @return {boolean}
   */
  const dispatchClaimErrorEvent = (error) =>
    document.dispatchEvent(
      new CustomEvent(EVENT_NAMES.CLAIM_ERROR, { detail: error })
    );

  /**
   * Dispatch shareClaimSuccess event.
   * @param claim
   * @return {boolean}
   */
  const dispatchShareClaimSuccessEvent = (claim) =>
    document.dispatchEvent(
      new CustomEvent(EVENT_NAMES.SHARE_CLAIM_SUCCESS, { detail: claim })
    );

  /**
   * Dispatch shareClaimError event.
   * @return {boolean}
   */
  const dispatchShareClaimErrorEvent = () =>
    document.dispatchEvent(new CustomEvent(EVENT_NAMES.SHARE_CLAIM_ERROR));

  /**
   * Dispatch addClaimSuccess event.
   * @return {boolean}
   */
  const dispatchAddClaimSuccessEvent = () => {
    document.dispatchEvent(new CustomEvent(EVENT_NAMES.ADD_CLAIM_SUCCESS));
  };

  /**
   * Dispatch addClaimError event.
   * @return {boolean}
   */
  const dispatchAddClaimErrorEvent = () => {
    document.dispatchEvent(new CustomEvent(EVENT_NAMES.ADD_CLAIM_ERROR));
  };

  /**
   * Dispatch shareAccount event.
   * @param account
   * @return {boolean}
   */
  const dispatchShareAccountEvent = (account) =>
    document.dispatchEvent(
      new CustomEvent(EVENT_NAMES.SHARE_ACCOUNT, { detail: account })
    );

  return (
    <Dialog
      handleClose={
        dialog.context === DIALOG_TYPES.ASK_CLAIM ? handleDecline : handleClose
      }
      claim={claim}
      handleClaim={
        dialog.context === DIALOG_TYPES.ASK_CLAIM ? shareClaim : addClaim
      }
      open={open}
      {...dialog}
    />
  );
};

export default App;
