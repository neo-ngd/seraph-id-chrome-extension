import React from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import { createWallet, createDid } from '../utils/seraph';
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
    <BaseButton
      handleClick={createAndSetWallet}
      text={'Create a Wallet'}
      variant="contained"
    />
  );
}

export default (CreateWallet);
