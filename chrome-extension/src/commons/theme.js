// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import { createMuiTheme } from '@material-ui/core';

/**
 * Return @material-ui theme
 * @type {Theme}
 */
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Rajdhani, serif',
  },
  palette: {
    text: {
      primary: '#242424',
      secondary: '#969696',
      title: '#00E599',
      light: '#CBCFD4',
      button: '#FFFF',

      hint: '#00BF0B',
      error: '#FF6E6E',
    },
    primary: {
      main: '#3C444D',
      dark: '#30363D',
      light: '#FFF',
      contrastText: '#00BF0B',
      error: '#FF6E6E',
    },
  },
});

export default theme;
