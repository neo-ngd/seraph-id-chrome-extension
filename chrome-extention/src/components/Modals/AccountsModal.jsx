import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, ButtonBase, IconButton} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import { AddCircle, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import BaseButton from '../Buttons/BaseButton';
import BaseModal from './BaseModal';
import {
  getEncryptedPassword,
  getEncryptedPasswordToCS,
  setActiveAccount,
  // setExportedWallet,
  shareActiveAccountAlias
} from '../../pages/Background/actions';
import { downloadFile } from '../../commons/walletUtils';
// import {DIDNetwork} from "@sbc/seraph-id-sdk";
import {ENCRYPTED_PW_MSG} from "../../commons/constants";
import dictionary from "../../commons/dictionary";

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
    padding: `${spacing(0.25)}px 0 ${spacing(0.5)}px`,
    margin: `0 ${spacing(2)}px`,
    borderBottom: 'solid 1px rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: .33
    }
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: spacing(2),
    marginBottom: spacing(2),
  },
}));

const AccountsModal = ({ isOpen, onClose, wallet }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {wallet: accountFromStore, activeAccount} = useSelector(state => state);
  const [password, setPassword] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { accounts } = wallet;

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async request => {
      if (request.msg === ENCRYPTED_PW_MSG) {
        setPassword(request.password);
      }
    });
    dispatch(getEncryptedPassword())
  }, []);

  const handleExportWallet = () => {
    downloadFile(accountFromStore, 'wallet.json', 'text/json');
  };

  const header = () => (
      <Box pt={0.6}>
        <Box className={classes.headerText}>{dictionary.commons.accounts}</Box>
        {/* Temporary disabled */}
        {/*<ButtonBase className={classes.addIcon} onClick={addAccount} disabled={isAdding}>*/}
        {/*  <AddCircle />*/}
        {/*</ButtonBase>*/}
      </Box>
  );

  const openFormTab = () => {
    chrome.tabs.create({url: 'form.html'})
  };

  // Temporary disabled
  // const addAccount = async () => {
  //   if (!!password) {
  //     setIsAdding(true);
  //     wallet.createDID(DIDNetwork.PrivateNet);
  //     const promises = wallet.accounts.map(account => account.encrypt(password));
  //     await Promise.all(promises);
  //     const exportedWalletJSON = JSON.stringify(wallet.export());
  //     dispatch(setExportedWallet(exportedWalletJSON));
  //     setIsAdding(false)
  //   }
  // };

  // Temporary disabled
  // const handleRemoveAccount = async (event, accountLabel) => {
  //   event.stopPropagation();
  //   if (!!password) {
  //     setIsAdding(true);
  //     if (wallet.accounts.length > 1) {
  //       if (accountLabel === activeAccount) {
  //         if (wallet.accounts[0].label !== accountLabel) {
  //           dispatch(setActiveAccount(wallet.accounts[0].label));
  //         } else {
  //           dispatch(setActiveAccount(wallet.accounts[1].label));
  //         }
  //         dispatch(shareActiveAccountAlias());
  //       }
  //       wallet.accounts = [...wallet.accounts.filter(account => account.label !== accountLabel)];
  //       const promises = wallet.accounts.map(account => account.encrypt(password));
  //       await Promise.all(promises);
  //       const exportedWalletJSON = JSON.stringify(wallet.export());
  //       dispatch(setExportedWallet(exportedWalletJSON));
  //       setIsAdding(false);
  //     } else {
  //       dispatch(setExportedWallet(null));
  //       dispatch(setActiveAccount(null));
  //       dispatch(shareActiveAccountAlias());
  //     }
  //   }
  // };

  const changeAccount = (event, accountLabel) => {
    event.stopPropagation();
    dispatch(setActiveAccount(accountLabel));
    dispatch(shareActiveAccountAlias());
    dispatch(getEncryptedPasswordToCS());
  };

  return (
      <BaseModal HeaderComponent={header} isOpen={isOpen} onClose={onClose}>
        <Box style={{opacity: isAdding ? .33 : 1}}>
          {accounts.map((account, index) => (
              <Box data-test-id={'account-box'} key={account.label} className={classes.accountRow} onClick={e => changeAccount(e, account.label)}>
                <Box>
                  <Box color="text.primary" fontSize="14px">{`${dictionary.commons.address} ${index + 1}`}</Box>
                  <Box color="text.primary" fontSize="6px">{account.label}</Box>
                </Box>
                <Box color="text.hint" className={classes.accountInfo}>
                  {`${Object.keys(account.claims).length} ${dictionary.commons.claims}`}
                  {/* Temporary disabled */}
                  {/*<IconButton*/}
                  {/*    data-test-id={'account-remove-button'}*/}
                  {/*    className={classes.removeIcon}*/}
                  {/*    disableRipple*/}
                  {/*    onClick={handleRemoveAccount}*/}
                  {/*    aria-label="remove"*/}
                  {/*    disabled={isAdding}*/}
                  {/*>*/}
                  {/*  <Close color="inherit" fontSize="inherit" />*/}
                  {/*</IconButton>*/}
                </Box>
              </Box>
          ))}
        </Box>
        <Box className={classes.buttonsContainer}>
          <BaseButton
              testID={'export-wallet-button'}
              handleClick={handleExportWallet}
              text={dictionary.accountModal.exportWallet}
              small
          />
          <BaseButton
              testID={'import-wallet-button'}
              handleClick={openFormTab}
              text={dictionary.accountModal.importWallet}
              small
          />
        </Box>
      </BaseModal>
  );
};

AccountsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  wallet: PropTypes.object.isRequired,
};

export default AccountsModal;
