import React, { Fragment } from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import InputText from '../components/InputText/InputText';
import { createWallet, createDid } from '../commons/seraphSDKUtils';

import { useDispatch } from 'react-redux'

function CreateWallet() {
  const dispatch = useDispatch()

  function createAndSetWallet() {
    const walletName = { name: 'MyWallet' }
    const wallet = createWallet(walletName);
    createDid(wallet);
    setWallet(wallet);
  }

  function setWallet(wallet) {
    dispatch({ type: 'SET_WALLET', wallet });
  }

  return (
    <Fragment>
      <InputText></InputText>
      <BaseButton
        handleClick={createAndSetWallet}
        text={'Create a Wallet'}
        variant="contained"
      />
    </Fragment>
  );
}

export default (CreateWallet);
