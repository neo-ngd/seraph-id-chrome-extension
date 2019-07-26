import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';
import { connect } from 'react-redux';

import './Popup.css';

function Popup({ wallet }) {
  console.log(wallet);
  return (
    <div>
      <NavBar />
      {wallet === null ? <CreateWallet></CreateWallet> : wallet.name}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { wallet: state.wallet };
};

export default connect(mapStateToProps)(Popup);
