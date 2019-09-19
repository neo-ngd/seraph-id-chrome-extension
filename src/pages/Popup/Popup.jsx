import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';
import WalletInfo from '../../containers/WalletInfo';
import UnlockWallet from '../../containers/UnlockWallet';

import { useSelector } from 'react-redux';

function Popup() {
  const importedAccount = useSelector((state) => state.seraphID.wallet);
  const password = useSelector((state) => state.seraphID.password);

  return (
    <div>
      {importedAccount === null ? (
        <CreateWallet />
      ) : password === null ? (
        <UnlockWallet></UnlockWallet>
      ) : (
        <WalletInfo importedAccount={importedAccount}></WalletInfo>
      )}
    </div>
  );
}

export default Popup;
