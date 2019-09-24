import React, { useState, useEffect, Fragment } from 'react';
import {Grid, Divider, Typography } from '@material-ui/core';
import CopyButton from '../components/Buttons/CopyButton';
import Claim from '../components/Cards/Claim';
import { createWallet } from '../commons/seraphSdkUtils';
import { useSelector } from 'react-redux';

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
      <Claim id={claim[1].id} schema={claim[1].schema} />
    ));
  }

  if (wallet) {
    const { label: address } = wallet.accounts[0];
    return (
      <Fragment>
        <CopyButton textToCopy={address}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Address</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline" display="block" gutterBottom>
                {address}
              </Typography>
            </Grid>
          </Grid>
        </CopyButton>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" display="block" gutterBottom>
              Claims
            </Typography>
            <Grid item xs={12}>
              {showAllClaims()}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
  return null;
}

export default WalletInfo;
