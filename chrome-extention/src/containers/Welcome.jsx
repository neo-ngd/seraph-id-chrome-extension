import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import BaseButton from '../components/Buttons/BaseButton';
import { Box, Link, makeStyles } from '@material-ui/core';
import Layout from '../components/Layout/Layout';
import { setExportedWallet } from '../pages/Background/actions';
import { createFileInput } from '../commons/walletUtils';
import { sendErrorToCS, unknownError } from '../commons/errors';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleImportWallet = () => {
    try {
      const fileInput = createFileInput();

      fileInput.addEventListener("change", function() {
        setIsLoading(true);

        const file = this.files[0];
        const reader = new FileReader();
    
        reader.onload = async function() {
          const json = reader.result;
          dispatch(setExportedWallet(json));
          fileInput.remove();
        };
      
        reader.readAsText(file);
      }, false);

      fileInput.click();
    } catch (error) {
      setIsLoading(false);
      dispatch(sendErrorToCS(unknownError(error)));
    }
  }

  return (
    <Layout isLoading={isLoading}>
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
        <Link href="#" onClick={handleImportWallet} className={classes.link}>Or import an existing one</Link>
      </Box>
    </Layout>
  );
}

export default Welcome;
