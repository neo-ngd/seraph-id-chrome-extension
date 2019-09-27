import React from 'react';
import { Box, ButtonBase, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircle, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { createWallet } from '../../commons/seraphSdkUtils';
import BaseButton from '../Buttons/BaseButton';
import { downloadFile, readFileFromDisk } from '../../commons/walletUtils';
import BaseModal from './BaseModal';

const useStyles = makeStyles(({ palette, spacing }) => ({
  addIcon: {
    position: 'absolute',
    right: spacing(2),
    top: spacing(0.5),
    color: palette.primary.contrastText,
  },
  headerText: {
    textAlign: 'center',
    paddingTop: spacing(0.75),
    color: palette.text.primary,
    fontSize: '16px',
  },
  accountRow: {
    padding: '4px 0 8px',
    margin: '0 16px',
    borderBottom: 'solid 1px rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeIcon: {
    color: palette.text.secondary,
    padding: 0,
    fontSize: '12px',
    marginLeft: spacing(2),
  },
  accountInfo: {
    paddingTop: spacing(1),
  },
  buttonsContainer: {
    flexDirection: 'column',
    padding: '0 32px',
    marginBottom: spacing(2),
  },
}));

const AccountsModal = ({ isOpen, onClose, wallet }) => {
  const classes = useStyles();
  const password = useSelector((state) => state.password);
  const dispatch = useDispatch();
  const { accounts } = wallet;

  const handleRemoveClick = () => {}

  const importWallet = () => {
    const newWallet = new createWallet(JSON.parse(json));
    newWallet.decryptAll(password);
    const exportedWalletJSON = JSON.stringify(wallet.export());

    dispatch({ type: 'SET_WALLET', exportedWalletJSON });
    readFileFromDisk();
    // const allClaims = newWallet.getAllClaims(Object.keys(newWallet.didMap)[0]);
  }

  const exportWallet = () => {
    wallet.encryptAll(password);
    const exportedWalletJson = JSON.stringify(wallet.export());
    downloadFile(exportedWalletJson, 'wallet.json', 'text/json');
  }

  const header = () => (
    <Box>
      <Box className={classes.headerText}>Accounts</Box>
      <ButtonBase className={classes.addIcon}>
        <AddCircle />
      </ButtonBase>
    </Box>
  )

  return (
    <BaseModal HeaderCompoennt={header} isOpen={isOpen} onClose={onClose}>
      {accounts.map((account, index) => (
        <Box className={classes.accountRow}>
          <Box>
            <Box color="text.primary" fontSize="14px">{`Account ${index}`}</Box>
            <Box color="text.primary" fontSize="6px">{account.label}</Box>
          </Box>

          <Box color="text.hint" className={classes.accountInfo}>
            {`${Object.keys(account.claims).length} Claims`}
            <IconButton
              className={classes.removeIcon}
              disableRipple
              onClick={handleRemoveClick}
              aria-label="remove"
            >
              <Close color="inherit" fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Box className={classes.buttonsContainer}>
        <BaseButton
          handleClick={exportWallet}
          text={'Export wallet'}
          small
        />
        <BaseButton
          handleClick={importWallet}
          text={'Import wallet'}
          small
        />
      </Box>
    </BaseModal>
  );
}

export default AccountsModal;
