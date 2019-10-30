// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../components/Buttons/BaseButton';
import { Box, Link, makeStyles } from '@material-ui/core';
import Layout from '../components/Layout/Layout';
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
 * <Welcome />
 * Base view witch is shown when the user does not yet have any wallets.
 * @param onGoToPage
 * @return {*}
 * @constructor
 */
const Welcome = ({ onGoToPage }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Open the new browser tab with the import wallet form page.
   */
  const openFormTab = () => {
    chrome.tabs.create({ url: 'form.html' });
  };

  return (
    <Layout isLoading={isLoading}>
      <Box display="flex" flexDirection="column">
        <Box fontWeight="bold" fontSize={26} color="text.primary">
          {dictionary.welcome.title}
        </Box>

        <Box lineHeight="22px" mt={2} fontSize={16} color="text.primary">
          {dictionary.welcome.info}
        </Box>
        <Box lineHeight="22px" mt={2} fontSize={16} color="text.primary">
          {dictionary.welcome.more}
        </Box>
      </Box>

      <Box flexDirection="column" display="flex">
        <BaseButton handleClick={onGoToPage} text={dictionary.welcome.button} />
        <Link
          data-test-id={'import-wallet-link'}
          href="#"
          onClick={openFormTab}
          className={classes.link}
        >
          {dictionary.welcome.link}
        </Link>
      </Box>
    </Layout>
  );
};

Welcome.propTypes = {
  onGoToPage: PropTypes.func.isRequired,
};

export default Welcome;
