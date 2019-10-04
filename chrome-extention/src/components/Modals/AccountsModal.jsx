import React from 'react';
import { Box, ButtonBase, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircle, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import BaseButton from '../Buttons/BaseButton';
import BaseModal from './BaseModal';
import { setExportedWallet } from '../../pages/Background/actions';
import { downloadFile } from '../../commons/walletUtils';

const useStyles = makeStyles(({ palette, spacing }) => ({
  addIcon: {
    position: 'absolute',
    right: spacing(2),
    top: spacing(1.1),
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
    alignItems: 'center',
  },
  removeIcon: {
    color: palette.text.secondary,
    padding: 0,
    fontSize: '12px',
    marginLeft: spacing(1),
  },
  accountInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    padding: '0 32px',
    marginTop: spacing(2),
    marginBottom: spacing(2),
  },
}));

const AccountsModal = ({ isOpen, onClose, wallet }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accountFromStore = useSelector(state => state.wallet);
  const { accounts } = wallet;

  const handleRemoveAccount = () => {
    dispatch(setExportedWallet(null)); // TODO: there is no method in SDK for remove account
  };

  const handleExportWallet = () => {
    downloadFile(accountFromStore, 'wallet.json', 'text/json');
  };

  const header = () => (
    <Box pt="5px">
      <Box className={classes.headerText}>Accounts</Box>
      <ButtonBase className={classes.addIcon}>
        <AddCircle />
      </ButtonBase>
    </Box>
  );

  const openFormTab = () => {
    chrome.tabs.create({url: 'form.html'})
  };

  return (
    <BaseModal HeaderCompoennt={header} isOpen={isOpen} onClose={onClose}>
      {accounts.map((account, index) => (
        <Box key={account.label} className={classes.accountRow}>
          <Box>
            <Box color="text.primary" fontSize="14px">{`Account ${index}`}</Box>
            <Box color="text.primary" fontSize="6px">{account.label}</Box>
          </Box>

          <Box color="text.hint" className={classes.accountInfo}>
            {`${Object.keys(account.claims).length} Claims`}
            <IconButton
              className={classes.removeIcon}
              disableRipple
              onClick={handleRemoveAccount}
              aria-label="remove"
            >
              <Close color="inherit" fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Box className={classes.buttonsContainer}>
        <BaseButton
          handleClick={handleExportWallet}
          text={'Export wallet'}
          small
        />
        <BaseButton
          handleClick={openFormTab}
          text={'Import wallet'}
          small
        />
      </Box>
    </BaseModal>
  );
}

export default AccountsModal;
