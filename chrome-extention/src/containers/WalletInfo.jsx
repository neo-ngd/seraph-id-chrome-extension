import React, { useState, useEffect, Fragment } from 'react';
import {Grid, Divider, Typography, Box } from '@material-ui/core';
import CopyButton from '../components/Buttons/CopyButton';
import Claim from '../components/Cards/Claim';
import { createWallet } from '../commons/seraphSdkUtils';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';
import Layout from '../components/Layout/Layout';

function WalletInfo({ accountFromStore }) {
  const [wallet, setWallet] = useState(null);
  const password = useSelector((state) => state.password);
  useEffect(() => {
    async function decryptAccount() {
      const importedWallet = createWallet(JSON.parse(accountFromStore));
      await importedWallet.accounts[0].decrypt(password);
      setWallet(importedWallet);
    }
    decryptAccount();
  }, []);

  function showAllClaims() {
    const claimsArr = Object.entries(wallet.accounts[0].claims);
    return claimsArr.map((claim) => (
      <Claim id={claim[1].id} schema={claim[1].schema} content={wallet.accounts[0]} />
    ));
  }

  if (wallet) {
    const { label: address } = wallet.accounts[0];

    return (
      <Layout padding={'60px 0 0 0'} justifyStart>
        <NavBar address={address} name="Account 1" />
        <Box display="flex" flexDirection="column">
          <Box fontSize="24px" color="text.primary">Claims</Box>
          {showAllClaims()}
        </Box>
      </Layout>
    );
  }
  return null;
}

export default WalletInfo;
