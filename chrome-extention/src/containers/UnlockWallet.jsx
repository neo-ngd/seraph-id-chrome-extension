import React from 'react';
import { Box } from '@material-ui/core/';
import {useDispatch, useSelector} from 'react-redux';
import BaseButton from '../components/Buttons/BaseButton';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import Layout from '../components/Layout/Layout';
import useText from '../commons/hooks/useText';
import RotatingLogo from '../components/RotatingLogo/RotatingLogo';
import {checkPassword, destroyError} from "../pages/Background/actions";
import { INVALID_PW } from "../commons/errorCodes";

function UnlockWallet() {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state);
  const { password, handleChange } = useText();

  const unlock = async () => {
    dispatch(checkPassword(password));
  };

  const removeError = () => setTimeout(() => dispatch(destroyError()), 3000);

  if (!!error && error.code === INVALID_PW) {
      removeError();
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
        {!!error && error.code === INVALID_PW && (<span>error.message</span>)}
      </Box>

      <Box>
        <BaseButton
          handleClick={unlock}
          text={'Unlock Wallet'}
          icon
        />
      </Box>
    </Layout>
  );
}

export default UnlockWallet;
