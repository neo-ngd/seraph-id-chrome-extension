import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import Claim from '../components/Cards/Claim';
import { createWallet } from '../commons/seraphSdkUtils';
import { useDispatch } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';
import Layout from '../components/Layout/Layout';
import AccountsModal from '../components/Modals/AccountsModal';
import { setExportedWallet } from '../pages/Background/actions';
import { getEncryptedPassword } from "../pages/Background/actions";
import {ENCRYPTED_PW_MSG} from "../commons/constants";

function WalletInfo({ accountFromStore }) {
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState(null);
  const [pw, setPw] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState();
  
  useEffect(() => {
    setIsLoading(true);
    chrome.runtime.onMessage.addListener(async request => {
      if (request.msg === ENCRYPTED_PW_MSG) {
        await decryptAccount(request.password);
        setIsLoading(false);
        setPw(request.password);
      }
    });
    dispatch(getEncryptedPassword())
  }, []);

  useEffect(() => {
    setIsLoading(true);

    handleCloseAccountsModal(false);
    if (pw) {
      (async () => {
        await decryptAccount(pw);
        setIsLoading(false);
      })();
    }
  }, [accountFromStore]);

  const decryptAccount = async (password) => {
    const importedWallet = createWallet(JSON.parse(accountFromStore));
    await importedWallet.accounts[0].decrypt(password);
    setWallet(importedWallet);
  };

  const removeClaim = async (id) => {
    delete wallet.accounts[0].claims[id];
    setWallet(wallet);

    await wallet.accounts[0].encrypt(pw);
    const exportedWalletJSON = JSON.stringify(wallet.export());
    dispatch(setExportedWallet(exportedWalletJSON));
  }

  const showAllClaims = (claims) => {
    return claims.map((claim) => (
      <Claim
        key={claim[0]}
        id={claim[1].id}
        schema={claim[1].schema}
        content={claim[1].attributes}
        onRemoveClaim={removeClaim}
      />
    ));
  };

  const openAccountsModal = () => {
    setModalVisibility(true);
  };

  const handleCloseAccountsModal = () => {
    setModalVisibility(false);
  };

  if (wallet) {
    const claimsArr = Object.entries(wallet.accounts[0].claims);
    const { label: address } = wallet.accounts[0];

    return (
      <Layout padding={'60px 0 0 0'} justifyStart isLoading={isLoading}>
        <NavBar address={address} onOpenAccountsModal={openAccountsModal} name="Account 1" />
        <Box
          display="flex" 
          flex="1"
          flexDirection="column"
          justifyContent={claimsArr.length > 0 ? 'flex-start' : 'space-between'}
          overflow="auto"
        >
          <Box fontSize="24px" color="text.primary">Claims</Box>

          {claimsArr.length > 0 ? (
            <Box>
              {showAllClaims(claimsArr)}
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
