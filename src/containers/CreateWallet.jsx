import React from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import { createWallet, createDid } from '../utils/seraph';
import { useDispatch } from 'react-redux'

function CreateWallet() {
  const dispatch = useDispatch()

  function createAndSetWallet() {
    const wallet = createWallet();

    createDid(wallet);
    console.log("wallet2", wallet)
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
