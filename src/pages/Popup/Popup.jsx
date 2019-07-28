import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';
import { connect } from 'react-redux';
import WalletInfo from '../../containers/WalletInfo';

import './Popup.css';

function Popup({ wallet }) {
  const isWallet = (wallet) => {
    if (wallet === null) return false;
    return true;
  };
  console.log(wallet);
  return (
    <div>
      <NavBar />
      {isWallet(wallet) ? (
        <WalletInfo
          name={wallet.name}
          address={wallet.accounts[0].label}
        ></WalletInfo>
      ) : (
        <CreateWallet />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { wallet: state.wallet };
};

export default connect(mapStateToProps)(Popup);
