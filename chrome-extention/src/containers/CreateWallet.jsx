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

const CreateWallet = () => {
  const dispatch = useDispatch();
  const { password, handleChange } = useText();
  const [isLoading, setIsLoading] = useState();

  const createAndSetWallet = async () => {
    setIsLoading(true);
    const wallet = createWallet({name: WALLET_NAME});
    wallet.createDID(DIDNetwork.PrivateNet);
    dispatch(setActiveAccount(wallet.accounts[0].label));
    await wallet.accounts[0].encrypt(password);
    const exportedWalletJSON = JSON.stringify(wallet.export());
    setWallet(exportedWalletJSON);
  };

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
          {dictionary.createWallet.title};
        </Box>

        <Box lineHeight="22px" mt={2} fontSize={14} color="text.secondary">
          {dictionary.createWallet.info};
        </Box>
      </Box>

      <Box>
        <PasswordInput value={password} handleChange={handleChange} />
        <Box mt={1} fontSize="10px" color="text.secondary">
          {dictionary.createWallet.passwordInfo};
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
