import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
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
    var claimsArr = Object.entries(wallet.accounts[0].claims);
    let list = claimsArr.map((claim) => (
      <Claim id={claim[1].id} schema={claim[1].schema}></Claim>
    ));
    return list;
  }

  if (wallet) {
    const { label: address } = wallet.accounts[0];
    return (
      <React.Fragment>
        <CopyButton textToCopy={address}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="button">{wallet.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline" display="block" gutterBottom>
                {address}
              </Typography>
            </Grid>
          </Grid>
        </CopyButton>
        <Divider />
        <Typography variant="h6" display="block" gutterBottom>
          Claims
        </Typography>
        {showAllClaims()}
      </React.Fragment>
    );
  } else return null;
}

export default WalletInfo;
