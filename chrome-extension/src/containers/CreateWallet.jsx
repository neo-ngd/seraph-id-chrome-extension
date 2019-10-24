// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useState } from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useText from '../commons/hooks/useText';
import { DIDNetwork } from '@sbc/seraph-id-sdk';
import Layout from '../components/Layout/Layout';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import {
  getEncryptedPasswordToCS,
  setActiveAccount,
  setExportedWallet,
  setPassword,
  shareActiveAccountAlias
} from "../pages/Background/actions";
import {WALLET_NAME} from "../commons/constants";
import {createWallet} from "../commons/seraphSdkUtils";
import dictionary from "../commons/dictionary";

/**
 * <CreateWallet />
 * The CreateWallet container.
 * Base view witch is shown when the user does not yet have any wallets.
 * User could open this view from the <Welcome /> component.
 * @return {*}
 * @constructor
 */
const CreateWallet = () => {
  const dispatch = useDispatch();
  const { password, handleChange } = useText();
  const [isLoading, setIsLoading] = useState();

  /**
   * Create and set the new wallet.
   * Set the first account in the wallet as the active.
   * @return {Promise<void>}
   */
  const createAndSetWallet = async () => {
    setIsLoading(true);
    const wallet = createWallet({name: WALLET_NAME});
    wallet.createDID(DIDNetwork.PrivateNet);
    dispatch(setActiveAccount(wallet.accounts[0].label));
    await wallet.accounts[0].encrypt(password);
    const exportedWalletJSON = JSON.stringify(wallet.export());
    setWallet(exportedWalletJSON);
  };

  /**
   * Dispatch the new wallet to the redux store.
   * Set the password in the password service.
   * Send active account label to the active tab.
   * Send the wallet data to the content script.
   * @param wallet
   */
  const setWallet = (wallet) => {
    dispatch(setExportedWallet(wallet));
    dispatch(setPassword(password));
    dispatch(shareActiveAccountAlias());
    dispatch(getEncryptedPasswordToCS())
  };

  return (
    <Layout isLoading={isLoading}>
      <Box display="flex" flexDirection="column">
        <Box fontSize={24} color="text.primary">
          {dictionary.createWallet.title}
        </Box>

        <Box lineHeight="22px" mt={2} fontSize={14} color="text.secondary">
          {dictionary.createWallet.info}
        </Box>
      </Box>

      <Box>
        <PasswordInput value={password} handleChange={handleChange} />
        <Box mt={1} fontSize="10px" color="text.secondary">
          {dictionary.createWallet.passwordInfo}
        </Box>
      </Box>

      <Box flexDirection="column" display="flex" mt={2} pb={2}>
        <BaseButton
          testID={'create-wallet-button'}
          disabled={password.length < 5}
          handleClick={createAndSetWallet}
          text={'Create a Wallet'}
        />
      </Box>
    </Layout>
  );
};

export default CreateWallet;
