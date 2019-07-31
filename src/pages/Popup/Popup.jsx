import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';
import WalletInfo from '../../containers/WalletInfo';
import { useSelector } from 'react-redux'

import './Popup.css';

function Popup() {
  const wallet = useSelector(state => state.wallet)

  return (
    <div>
      <NavBar />
      {(wallet === null) ? (
        <CreateWallet />
      ) : (
          <WalletInfo
            name={wallet.name}
            address={wallet.accounts[0].label}
            claims={wallet.accounts[0].claims}
          ></WalletInfo>
        )}
    </div>
  );
}



export default (Popup);
