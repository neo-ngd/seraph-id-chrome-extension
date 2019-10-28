// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import Claim from '../components/Cards/Claim';
import { decrypt } from '../commons/seraphSdkUtils';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';
import Layout from '../components/Layout/Layout';
import AccountsModal from '../components/Modals/AccountsModal';
import { setExportedWallet } from '../pages/Background/actions';
import { getEncryptedPassword } from '../pages/Background/actions';
import { ENCRYPTED_PW_MSG } from '../commons/constants';
import dictionary from '../commons/dictionary';
import env from '../environments/environment';

/**
 * <WalletInfo />
 * Base view which is shown when the user is logged in.
 * @return {*}
 * @constructor
 */
const WalletInfo = () => {
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState(null);
  const [pw, setPw] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const { activeAccount } = useSelector((state) => state);

  useEffect(() => {
    setIsLoading(true);
    chrome.runtime.onMessage.addListener(listener);
    dispatch(getEncryptedPassword());
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  /**
   * The listener which decrypt the wallet using the provided data.
   * @param request
   * @return {Promise<void>}
   */
  const listener = async (request) => {
    if (request.msg === ENCRYPTED_PW_MSG) {
      setPw(request.password);
      await decryptAccount(request.password, request.wallet);
    }
  };

  /**
   * Decrypt the wallet
   * @param password
   * @param accountFromStore
   * @return {Promise<void>}
   */
  const decryptAccount = async (password, accountFromStore) => {
    const wallet = await decrypt(accountFromStore, password);
    if (!!wallet) {
      setWallet(wallet);
      setIsLoading(false);
    }
  };

  /**
   * Remove the claim for the wallet.
   * @param id
   * @return {Promise<void>}
   */
  const removeClaim = async (id) => {
    delete wallet.accounts[0].claims[id];
    setWallet(wallet);

    await wallet.accounts[0].encrypt(pw);
    const exportedWalletJSON = JSON.stringify(wallet.export());
    dispatch(setExportedWallet(exportedWalletJSON));
  };

  /**
   * Return claim list.
   * @param claims
   * @return {*}
   */
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

  /**
   * Open accounts modal.
   */
  const openAccountsModal = () => {
    setModalVisibility(true);
  };

  /**
   * Close accounts modal
   */
  const handleCloseAccountsModal = () => {
    setModalVisibility(false);
  };

  /**
   * Open the new browser tab with the external demo site.
   */
  const openDemo = () => {
    chrome.tabs.create({ url: env.DEMO_URL });
  };

  if (!!wallet) {
    const account = wallet.accounts.find((acc) => acc.label === activeAccount);
    const claimsArr = Object.entries(account.claims);
    const { label: address } = account;

    return (
      <Layout padding={'60px 0 0 0'} justifyStart isLoading={isLoading}>
        <NavBar
          address={address}
          onOpenAccountsModal={openAccountsModal}
          name={`${dictionary.commons.account} ${wallet.accounts.indexOf(
            account
          ) + 1}`}
        />
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent={claimsArr.length > 0 ? 'flex-start' : 'space-between'}
          overflow="auto"
        >
          <Box fontSize="24px" color="text.primary">
            {dictionary.commons.claims}
          </Box>
          {claimsArr.length > 0 ? (
            <Box>{showAllClaims(claimsArr)}</Box>
          ) : (
            <Box
              color="text.primary"
              fontSize="16px"
              lineHeight="28px"
              textAlign="center"
            >
              {dictionary.walletInfo.info}
              <span
                data-test-id={'open-demo-link'}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={openDemo}
              >
                {dictionary.walletInfo.website}
              </span>
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
  return <Layout isLoading={isLoading} />;
};

export default WalletInfo;
