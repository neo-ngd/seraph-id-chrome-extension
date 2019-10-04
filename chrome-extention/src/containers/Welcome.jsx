import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

import BaseButton from '../components/Buttons/BaseButton';
import { Box, Link, makeStyles } from '@material-ui/core';
import Layout from '../components/Layout/Layout';
import { setExportedWallet } from '../pages/Background/actions';
import { createFileInput } from '../commons/walletUtils';
import { sendErrorToCS, unknownError } from '../commons/errors';
import {IMPORT_SUCCESS_MSG} from "../commons/constants";

const useStyles = makeStyles(({ palette, spacing }) => ({
  link: {
    color: palette.text.secondary,
    textAlign: 'center',
    marginTop: spacing(1),
  },
}));

function Welcome({ onGoTopage }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const openFormTab = () => {
    chrome.tabs.create({url: 'form.html'})
  };

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
        <Link href="#" onClick={openFormTab} className={classes.link}>Or import an existing one</Link>
      </Box>
    </Layout>
  );
}

export default Welcome;
