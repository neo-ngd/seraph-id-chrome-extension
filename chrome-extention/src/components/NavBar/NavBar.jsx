import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Box, ButtonBase} from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  barStyle: {
    background: palette.primary.dark,
    height: '56px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  imageContainer: {
    position: 'absolute',
    right: spacing(-2),
    top: spacing(1)
  },
  img: {
    maxWidth: '80px',
  }
}));

export default function NavBar({ address, name, onOpenAccountsModal }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.barStyle} position="static" color="default">
      <Toolbar>
        <Box display="flex" flexDirection="column" flex={1}>
          <Box textAlign="center" color="text.primary" fontSize="11px">
            {name}
          </Box>

          <Box color="text.secondary" fontSize="10px" textAlign="center" pt="5px">
            {address}
          </Box>

          <ButtonBase disableRipple onClick={onOpenAccountsModal} className={classes.imageContainer}>
            <img className={classes.img} src={require("../../assets/icons/fingerprint.png")} />
          </ButtonBase>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
