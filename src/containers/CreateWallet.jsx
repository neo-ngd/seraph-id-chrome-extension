import React from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import { connect } from 'react-redux';
import { createWallet, createDid } from '../utils/seraph';

function CreateWallet({ dispatch }) {
  function createAndSetWallet() {
    const wallet = createWallet();
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

export default connect()(CreateWallet);
