// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useEffect, useState } from 'react';
import { Box, Link, makeStyles } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import BaseButton from '../components/Buttons/BaseButton';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import Layout from '../components/Layout/Layout';
import useText from '../commons/hooks/useText';
import RotatingLogo from '../components/RotatingLogo/RotatingLogo';
import { checkPassword } from '../pages/Background/actions';
import { ERROR_MSG, INVALID_PW } from '../commons/errors';
import dictionary from '../commons/dictionary';

/**
 * Component styles.
 * @type {StylesHook<Styles<{readonly spacing?: *, readonly palette?: *}, {}, string>>}
 */
const useStyles = makeStyles(({ palette, spacing }) => ({
  link: {
    color: palette.text.secondary,
    textAlign: 'center',
    marginTop: spacing(1),
  },
}));
/**
 * <UnlockWallet />
 * Base view which is shown when the user has some encrypted wallets but doesn't have the password in the password service.
 * @return {*}
 * @constructor
 */
const UnlockWallet = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { password, handleChange } = useText();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.msg === ERROR_MSG && request.error.code === INVALID_PW) {
        setDisabled(false);
        setError(request.error);
      }
    });
  }, []);

  /**
   * Check the password and set it in the password service.
   * @return {Promise<void>}
   */
  const unlock = async () => {
    setError(null);
    setDisabled(true);
    dispatch(checkPassword(password));
  };

  /**
   * Open the new browser tab with the import wallet form page.
   */
  const openFormTab = () => {
    chrome.tabs.create({ url: 'form.html' });
  };

  return (
    <Layout>
      <Box>
        <Box fontSize={24} color="text.primary">
          {dictionary.unlockWallet.title}
        </Box>
      </Box>

      <Box>
        <RotatingLogo />
      </Box>

      <Box>
        <PasswordInput
          value={password}
          handleChange={handleChange}
          hasError={!!error}
        />
        {!!error ? (
          <Box mt={1} fontSize="10px" color="text.error">
            {dictionary.unlockWallet.error}
          </Box>
        ) : (
          <Box mt={1} fontSize="10px" color="text.secondary">
            {dictionary.unlockWallet.info}{' '}
            <Link
              data-test-id={'import-wallet-link'}
              href="#"
              onClick={openFormTab}
              className={classes.link}
            >
              {dictionary.welcome.link.toLowerCase()}
            </Link>
          </Box>
        )}
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <BaseButton
          testID={'unlock-wallet-button'}
          disabled={disabled}
          handleClick={unlock}
          text={dictionary.unlockWallet.unlock}
          icon
        />
      </Box>
    </Layout>
  );
};

export default UnlockWallet;
