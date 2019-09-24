import React, { Fragment } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CreateWallet from '../../containers/CreateWallet';
import WalletInfo from '../../containers/WalletInfo';
import UnlockWallet from '../../containers/UnlockWallet';

import { useSelector } from 'react-redux';

function Popup() {
  const accountFromStore = useSelector((state) => state.wallet);
  const password = useSelector((state) => state.password);

  const selectComponent = () => {
    if (!accountFromStore) {
      return (<CreateWallet />)
    }
    if (!password) {
      return (
        <UnlockWallet
          accountFromStore={accountFromStore}
          password={password}
      />)
    }
    return (
      <WalletInfo
        accountFromStore={accountFromStore}/>)
  };

  return (
    <Fragment>
      <NavBar/>
      {selectComponent()}
    </Fragment>
  );
}

export default Popup;
