// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Box, ButtonBase } from '@material-ui/core';
import image from '../../assets/icons/fingerprint.png';

/**
 * Component styles
 * @type {StylesHook<Styles<{readonly spacing?: *, readonly palette?: *}, {}, string>>}
 */
const useStyles = makeStyles(({ palette, spacing }) => ({
  barStyle: {
    background: palette.primary.dark,
    height: '56px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: 'transparent',
    boxShadow: 'none',
  },
  imageContainer: {
    position: 'absolute',
    right: spacing(-2),
    top: spacing(1),
  },
  img: {
    maxWidth: '80px',
  },
}));

/**
 * <NavBar />
 * The navigation bar which shows the current account address and allows for opening the accounts dialog modal.
 * @param address
 * @param name
 * @param onOpenAccountsModal
 * @return {*}
 * @constructor
 */
const NavBar = ({ address, name, onOpenAccountsModal }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.barStyle} position="static" color="default">
      <Toolbar>
        <Box display="flex" flexDirection="column" flex={1}>
          <Box textAlign="center" color="text.primary" fontSize="13px">
            {name}
          </Box>

          <Box
            color="text.secondary"
            fontSize="12px"
            textAlign="center"
            pt={0.6}
          >
            {address}
          </Box>

          <ButtonBase
            disableRipple
            onClick={onOpenAccountsModal}
            className={classes.imageContainer}
          >
            <img alt="logo-img" className={classes.img} src={image} />
          </ButtonBase>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  onOpenAccountModal: PropTypes.func,
};

export default NavBar;
