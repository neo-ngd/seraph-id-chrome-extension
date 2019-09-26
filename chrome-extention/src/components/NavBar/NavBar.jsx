import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Box} from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  barStyle: {
    background: palette.primary.dark,
    height: '56px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
}));

export default function NavBar({ address, name }) {
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
