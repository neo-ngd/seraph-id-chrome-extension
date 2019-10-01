import React from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useText from '../commons/hooks/useText';
import { SeraphIDWallet, DIDNetwork } from '@sbc/seraph-id-sdk';
import Layout from '../components/Layout/Layout';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import {setExportedWallet, setEncryptedPassword} from "../pages/Background/actions";

function CreateWallet() {
  const dispatch = useDispatch();
  const { password, handleChange } = useText();

  function createAndSetWallet() {
    const wallet = new SeraphIDWallet({ name: 'MyWallet' });
    wallet.createDID(DIDNetwork.PrivateNet);
    wallet.accounts[0].encrypt(password).then(() => {
      const exportedWalletJSON = JSON.stringify(wallet.export());
      setWallet(exportedWalletJSON);
    });
  }

  function setWallet(wallet) {
    dispatch(setExportedWallet(wallet));
    dispatch(setEncryptedPassword(password));
  }

  return (
    <Layout>
      <Box display="flex" flexDirection="column">
        <Box fontSize={24} color="text.primary">Please choose a secure password </Box>

        <Box lineHeight="22px" mt={2} fontSize={14} color="text.secondary">
          The password will be used to lock the extention after you close the browser and to encrypt the wallet if you decide to export it... so don’t forget it!
        </Box>
      </Box>

      <Box>
        <PasswordInput value={password} handleChange={handleChange} minLength={5} />
        <Box mt={1} fontSize="10px" color="text.secondary">Chose a password of at least 5 characters</Box>
      </Box>

      <Box flexDirection="column" display="flex" mt={2} pb={2}>
        <BaseButton
          disabled={password.length < 5}
          handleClick={createAndSetWallet}
          text={'Create a Wallet'}
        />
      </Box>
    </Layout>
  );
}

export default CreateWallet;
