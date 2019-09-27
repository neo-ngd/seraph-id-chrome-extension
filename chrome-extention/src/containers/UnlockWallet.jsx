import React from 'react';
import { Box } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import BaseButton from '../components/Buttons/BaseButton';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import { setPassword } from '../pages/Background/actions';
import Layout from '../components/Layout/Layout';
import useText from '../commons/hooks/useText';
import RotatingLogo from '../components/RotatingLogo/RotatingLogo';

function UnlockWallet() {
  const dispatch = useDispatch();
  const { password, handleChange } = useText();

  function dispatchPassword() {
    dispatch(setPassword(password));
  }

  return (
    <Layout>
      <Box>
        <Box fontSize={24} color="text.primary">Welcome back</Box>
      </Box>

      <Box>
        <RotatingLogo />
      </Box>

      <Box>
        <PasswordInput value={password} handleChange={handleChange} />
        <Box mt={1} fontSize="10px" color="text.secondary">To continue, please unlock your wallet</Box>
      </Box>

      <Box>
        <BaseButton
          handleClick={dispatchPassword}
          text={'Unlock Wallet'}
          icon
        />
      </Box>
    </Layout>
  );
}

export default UnlockWallet;
