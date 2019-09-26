import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import CreateWallet from '../../containers/CreateWallet';
import WalletInfo from '../../containers/WalletInfo';
import UnlockWallet from '../../containers/UnlockWallet';
import Welcome from '../../containers/Welcome';

const PAGES = {
  WELCOME: 'welcome',
  CREATE_WALLET: 'create_wallet',
  UNLOCK_WALLET: 'unlock_wallet',
  CLAIMS: 'claims',
};

function Popup() {
  const [page, setPage] = useState(PAGES.WELCOME);
  const accountFromStore = useSelector((state) => state.wallet);
  const password = useSelector((state) => state.password);

  const goToPage = page => setPage(page);

  useEffect(() => {
    if (accountFromStore) {
      if (password) {
        goToPage(PAGES.CLAIMS);
      } else {
        goToPage(PAGES.UNLOCK_WALLET);
      }
    }
  }, [accountFromStore, password])

  const selectComponent = () => {
    if (page === PAGES.WELCOME) {
      return (<Welcome onGoTopage={() => goToPage(PAGES.CREATE_WALLET)} />)
    }

    if (page === PAGES.CREATE_WALLET) {
      return (<CreateWallet onGoTopage={() => goToPage(PAGES.UNLOCK_WALLET)} />)
    }

    if (page === PAGES.UNLOCK_WALLET) {
      return (
        <UnlockWallet
          accountFromStore={accountFromStore}
          password={password}
        />
      )
    }

    if (page === PAGES.CLAIMS) {
      return <WalletInfo accountFromStore={accountFromStore}/>
    }

    return (<div>page error</div>)
  };

  return (
    <Box display="flex" height="100%" width="100%">
      {selectComponent()}
    </Box>
  );
}

export default Popup;
