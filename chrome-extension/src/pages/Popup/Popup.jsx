import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

import CreateWallet from '../../containers/CreateWallet';
import WalletInfo from '../../containers/WalletInfo';
import UnlockWallet from '../../containers/UnlockWallet';
import Welcome from '../../containers/Welcome';

/**
 * The page slugs.
 * @type {{CREATE_WALLET: string, CLAIMS: string, WELCOME: string, UNLOCK_WALLET: string}}
 */
const PAGES = {
  WELCOME: 'welcome',
  CREATE_WALLET: 'create_wallet',
  UNLOCK_WALLET: 'unlock_wallet',
  CLAIMS: 'claims',
};

/**
 * <Popup />
 * Base popup container.
 * @return {*}
 * @constructor
 */
const Popup = () => {
  const [page, setPage] = useState(PAGES.WELCOME);
  const { session, wallet: accountFromStore } = useSelector((state) => state);
  const goToPage = (page) => setPage(page);

  useEffect(() => {
    if (accountFromStore) {
      if (session) {
        goToPage(PAGES.CLAIMS);
      } else {
        goToPage(PAGES.UNLOCK_WALLET);
      }
    } else {
      goToPage(PAGES.WELCOME);
    }
  }, [accountFromStore, session]);

  /**
   * Select proper container based on the set page slug.
   * @return {*}
   */
  const selectComponent = () => {
    if (page === PAGES.WELCOME) {
      return <Welcome onGoToPage={() => goToPage(PAGES.CREATE_WALLET)} />;
    }

    if (page === PAGES.CREATE_WALLET) {
      return <CreateWallet />;
    }

    if (page === PAGES.UNLOCK_WALLET) {
      return <UnlockWallet />;
    }

    if (page === PAGES.CLAIMS) {
      return <WalletInfo />;
    }

    return <div>page error</div>;
  };

  return (
    <Box display="flex" height="100%" width="100%">
      {selectComponent()}
    </Box>
  );
};

export default Popup;
