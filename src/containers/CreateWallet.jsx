import React from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import { connect } from 'react-redux';
import { createWallet } from '../utils/seraph';

function CreateWallet({ dispatch }) {
  function setWallet() {
    console.log('clicked');

    const wallet = createWallet();
    console.log(wallet);
    dispatch({ type: 'SET_WALLET', wallet });
  }

  return (
    <BaseButton
      handleClick={setWallet}
      text={'Create a Wallet'}
      variant="contained"
    />
  );
}

export default connect()(CreateWallet);
