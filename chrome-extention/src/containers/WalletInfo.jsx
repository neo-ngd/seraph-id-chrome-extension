import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import Claim from '../components/Cards/Claim';
import { createWallet } from '../commons/seraphSdkUtils';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';
import Layout from '../components/Layout/Layout';
import AccountsModal from '../components/Modals/AccountsModal';

function WalletInfo({ accountFromStore }) {
  const [wallet, setWallet] = useState(null);
  const password = useSelector((state) => state.password);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    async function decryptAccount() {
      const importedWallet = createWallet(JSON.parse(accountFromStore));
      await importedWallet.accounts[0].decrypt(password);
      setWallet(importedWallet);
    }
    decryptAccount();
  }, []);

  
  const showAllClaims = () => {
    const claimsArr = Object.entries(wallet.accounts[0].claims);
    return claimsArr.map((claim) => (
      <Claim key={claim[0]} id={claim[1].id} schema={claim[1].schema} content={claim[1].attributes} />
    ));
  };

  const openAccountsModal = () => {
    setModalVisibility(true);
  };

  const handleCloseAccountsModal = () => {
    setModalVisibility(false);
  };


  if (wallet) {
    const { label: address } = wallet.accounts[0];
    const claimsArr = Object.entries(wallet.accounts[0].claims);

    return (
      <Layout padding={'60px 0 0 0'} justifyStart>
        <NavBar address={address} onOpenAccountsModal={openAccountsModal} name="Account 1" />
        <Box
          display="flex" 
          flex="1"
          flexDirection="column"
          justifyContent={claimsArr.length > 0 ? 'flex-start' : 'space-between'}
        >
          <Box fontSize="24px" color="text.primary">Claims</Box>

          {claimsArr.length > 0 ? (
            <Box>
              {showAllClaims()}
            </Box>
          ) : (
            <Box color="text.primary" fontSize="16px" lineHeight="28px" textAlign="center">
              No Claims yet? Why you don’t play around with our demo
            </Box>
          )}
        </Box>

        <AccountsModal
          onClose={handleCloseAccountsModal}
          isOpen={modalVisibility}
          wallet={wallet}
        />
      </Layout>
    );
  }
  return null;
}

export default WalletInfo;
