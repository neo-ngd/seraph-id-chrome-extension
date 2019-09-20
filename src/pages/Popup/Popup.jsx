import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';
import WalletInfo from '../../containers/WalletInfo';
import UnlockWallet from '../../containers/UnlockWallet';

import { useSelector } from 'react-redux';

function Popup() {
  const accountFromStore = useSelector((state) => state.wallet);
  const password = useSelector((state) => state.password);
  return (
    <div>
      {accountFromStore === null ? (
        <CreateWallet />
      ) : password === null ? (
        <UnlockWallet
          accountFromStore={accountFromStore}
          password={password}
        ></UnlockWallet>
      ) : (
        <WalletInfo accountFromStore={accountFromStore}></WalletInfo>
      )}
    </div>
  );
}

export default Popup;
