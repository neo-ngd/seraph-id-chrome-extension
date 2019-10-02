import React from 'react';
import { useDispatch } from 'react-redux';

import BaseButton from '../components/Buttons/BaseButton';
import { Box, Link, makeStyles } from '@material-ui/core';
import Layout from '../components/Layout/Layout';
import { createWallet } from '../commons/seraphSdkUtils';
import { setExportedWallet } from '../pages/Background/actions';
import { createFileInput } from '../commons/walletUtils';

const useStyles = makeStyles(({ palette, spacing }) => ({
  link: {
    color: palette.text.secondary,
    textAlign: 'center',
    marginTop: spacing(1),
  },
}));

function Welcome({ onGoTopage }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleImportedFile() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = async function() {
      const json = reader.result;
      const newWallet = new createWallet(JSON.parse(json));

      const exportedWalletJSON = JSON.stringify(newWallet.export());

      dispatch(setExportedWallet(exportedWalletJSON));
      // const allClaims = newWallet.getAllClaims(Object.keys(newWallet.didMap)[0]);
    };
  
    reader.readAsText(file);
  }

  const importWallet = () => {
    const file = createFileInput();
    file.click();

    file.addEventListener("change", handleImportedFile, false);
  };

  return (
    <Layout>
      <Box display="flex" flexDirection="column">
        <Box fontSize={24} color="text.primary">Welcome to Seraph ID</Box>

        <Box lineHeight="22px" mt={2} fontSize={14} color="text.secondary">
          Seraph ID chrome extention allows you to manage your claims in a user-frielndly way
        </Box>
        <Box lineHeight="22px" mt={2} fontSize={14} color="text.secondary">
          To start to use Seraph ID please create a wallet or import an existing one
        </Box>
      </Box>

      <Box flexDirection="column" display="flex">
        <BaseButton
          handleClick={onGoTopage}
          text={'Create a Wallet'}
        />
        <Link href="#" onClick={importWallet} className={classes.link}>Or import an existing one</Link>
      </Box>
    </Layout>
  );
}

export default Welcome;
