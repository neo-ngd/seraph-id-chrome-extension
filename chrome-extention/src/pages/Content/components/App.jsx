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
  toggleDialog
} from '../../Background/actions';
import {claimDeclineError, ERROR_MSG } from "../../../commons/errors";
import {
  DIALOG_TYPES,
  EVENT_NAMES,
  SHARE_ACCOUNT_MSG,
  ADD_CLAIM_SUCCESS_MSG,
  ADD_CLAIM_ERROR_MSG,
  SHARE_CLAIM_SUCCESS_MSG, SHARE_CLAIM_ERROR_MSG
} from "../../../commons/constants";

function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isListener, setIsListener] = useState(false);
  const { dialog, claim } = useSelector(state => state);

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
    }
  }, []);

  const onMessageListener = request => {
    if (request.msg === SHARE_CLAIM_SUCCESS_MSG) {
      dispatchShareClaimSuccessEvent()
    }
    if (request.msg === SHARE_CLAIM_ERROR_MSG) {
      dispatchShareClaimErrorEvent()
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

  const getAddressListener = () => dispatch(shareActiveAccountAlias());

  const askClaimListener = ({detail}) => dispatch(askClaim(detail));

  const registerListeners = () => {
    document.addEventListener(EVENT_NAMES.SEND_CLAIM, getClaimListener);
    document.addEventListener(EVENT_NAMES.GET_ADDRESS, getAddressListener);
    document.addEventListener(EVENT_NAMES.ASK_CLAIM, askClaimListener);
    setIsListener(true);
  };

  const unregisterListeners = () => {
    document.removeEventListener(EVENT_NAMES.SEND_CLAIM, getClaimListener);
    document.removeEventListener(EVENT_NAMES.GET_ADDRESS, getAddressListener);
    document.removeEventListener(EVENT_NAMES.ASK_CLAIM, askClaimListener);
    setIsListener(false);
  };

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
    dispatchShareClaimErrorEvent();
    setOpen(false);
  };

  const addClaim = () => {
    dispatch(createClaim(claim, claim.schema));
    handleClose();
  };

  const shareClaim = () =>{
    dispatchShareClaimSuccessEvent(claim);
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
      askClaim: (schemaName, issuerDID, verifierName) => document.dispatchEvent(
          new CustomEvent('askClaim', { detail: {schemaName, issuerDID, verifierName} })
      ),

      /**
       * Ask for the current account address
       */
      shareAddress: () => document.dispatchEvent(
          new CustomEvent('getAddress')
      ),
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
   * Dispatch shareClaimSuccess event.
   * @param claim
   * @return {boolean}
   */
  const dispatchShareClaimSuccessEvent = claim =>
      document.dispatchEvent(new CustomEvent(EVENT_NAMES.SHARE_CLAIM_SUCCESS, { detail: claim}));

  /**
   * Dispatch shareClaimError event.
   * @param claim
   * @return {boolean}
   */
  const dispatchShareClaimErrorEvent = claim =>
      document.dispatchEvent(new CustomEvent(EVENT_NAMES.SHARE_CLAIM_ERROR, { detail: claim}));

  /**
   * Dispatch addClaimSuccess event.
   * @return {boolean}
   */
  const dispatchAddClaimSuccessEvent = () =>
      document.dispatchEvent(new CustomEvent(EVENT_NAMES.ADD_CLAIM_SUCCESS));

  /**
   * Dispatch addClaimError event.
   * @return {boolean}
   */
  const dispatchAddClaimErrorEvent = () =>
      document.dispatchEvent(new CustomEvent(EVENT_NAMES.ADD_CLAIM_ERROR));

  /**
   * Dispatch shareAccount event.
   * @param account
   * @return {boolean}
   */
  const dispatchShareAccountEvent = account =>
      document.dispatchEvent(new CustomEvent(EVENT_NAMES.SHARE_ACCOUNT, { detail: account }));

  return (
    <Dialog
      handleClose={dialog.context === DIALOG_TYPES.ASK_CLAIM ? handleDecline : handleClose}
      claim={claim}
      handleClaim={dialog.context === DIALOG_TYPES.ASK_CLAIM ? shareClaim : addClaim}
      open={open}
      {...dialog}
      />
  );
}

export default App;
