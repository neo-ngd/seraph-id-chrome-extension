import React, {useEffect, useState} from 'react';
import { Box } from '@material-ui/core/';
import {useDispatch } from 'react-redux';
import BaseButton from '../components/Buttons/BaseButton';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import Layout from '../components/Layout/Layout';
import useText from '../commons/hooks/useText';
import RotatingLogo from '../components/RotatingLogo/RotatingLogo';
import {  checkPassword } from "../pages/Background/actions";
import {ERROR_MSG, INVALID_PW} from "../commons/errors";

function UnlockWallet() {
  const dispatch = useDispatch();
  const { password, handleChange } = useText();
  const [ error, setError ] = useState(null);
  const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {
        chrome.runtime.onMessage.addListener(request => {
            if (request.msg === ERROR_MSG && request.error.code === INVALID_PW) {
                setDisabled(false);
                setError(request.error);
            }
        });
    }, []);

  const unlock = async () => {
      setError(null);
      setDisabled(true);
      dispatch(checkPassword(password));
  };

  return (
    <Layout>
      <Box>
        <Box fontSize={24} color="text.primary">Welcome back</Box>
      </Box>

      <Box>
        <RotatingLogo />
      </Box>

      <Box>
        <PasswordInput value={password} handleChange={handleChange} hasError={!!error}/>
          {!!error ? <Box mt={1} fontSize="10px" color="text.error">Invalid password. Try again.</Box> :
              <Box mt={1} fontSize="10px" color="text.secondary">To continue, please unlock your wallet</Box>}
      </Box>

      <Box>
        <BaseButton
            disabled={disabled}
          handleClick={unlock}
          text={'Unlock Wallet'}
          icon
        />
      </Box>
    </Layout>
  );
}

export default UnlockWallet;
